import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import {
  addMessage,
  loadMessages,
  loadMessagesError,
  loadMessagesSuccess,
  sendMessage,
} from '../actions/chats.actions';
import { LOCAL_STORAGE } from '../../app.config';
import { selectMessages } from '../selectors/chats.selectors';
import { Store } from '@ngrx/store';
import { ChatsApi } from '../../api';
import { Message } from '../../models';
import { selectUser } from '../selectors/auth.selectors';
import { selectSelectedChannel } from '../selectors/channels.selectors';

@Injectable({
  providedIn: 'root',
})
export class ChatsEffects {
  readonly localStorage = inject(LOCAL_STORAGE);
  readonly store = inject(Store);
  readonly chatsApi = inject(ChatsApi);
  readonly actions$ = inject(Actions);

  readonly MESSAGES_KEY = 'messages';

  listenSocketMessages$ = createEffect(() =>
    this.chatsApi
      .listenMessages()
      .pipe(map((message) => addMessage({ message }))),
  );

  sendMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendMessage),
      withLatestFrom(
        this.store.select(selectUser),
        this.store.select(selectSelectedChannel),
      ),
      map(([{ content }, user, channel]) => {
        if (!user || !channel) return { type: '[Noop]' };

        const message: Message = {
          id: crypto.randomUUID(),
          content,
          fromUser: user.username,
          channelId: channel.id,
        };

        this.chatsApi.sendMessage(message);

        return addMessage({ message });
      }),
    ),
  );

  persistMessages$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addMessage),
        withLatestFrom(this.store.select(selectMessages)),
        tap(([_, messages]) => {
          this.localStorage.setItem(
            this.MESSAGES_KEY,
            JSON.stringify(messages),
          );
        }),
      ),
    { dispatch: false },
  );

  loadMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMessages),
      switchMap(() => {
        const stored = this.localStorage.getItem(this.MESSAGES_KEY);
        if (!stored) throw new Error('No messages');

        const messages = JSON.parse(stored);

        return of(loadMessagesSuccess({ messages }));
      }),
      catchError((error) => of(loadMessagesError({ error: error.message }))),
    ),
  );
}

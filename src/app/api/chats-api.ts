import { inject, Injectable } from '@angular/core';
import { fromEvent, map } from 'rxjs';
import { SOCKET } from '../app.config';
import { Message } from '../models';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class ChatsApi {
  readonly socket = inject(SOCKET);
  readonly store = inject(Store);

  listenMessages() {
    return fromEvent<MessageEvent>(this.socket, 'message').pipe(
      map(({ data }) => data as Message),
    );
  }

  sendMessage(message: Message) {
    this.socket.postMessage(message);
  }
}

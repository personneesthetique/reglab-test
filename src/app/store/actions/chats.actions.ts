import { createAction, props } from '@ngrx/store';
import { Message } from '../../models';

export const sendMessage = createAction(
  '[Chats] Send Message',
  props<{ content: string }>(),
);

export const addMessage = createAction(
  '[Chats] Add Message',
  props<{ message: Message }>(),
);

export const loadMessages = createAction('[User Page] Load Messages');

export const loadMessagesSuccess = createAction(
  '[Chats] Load Messages Success',
  props<{ messages: Message[] }>(),
);

export const loadMessagesError = createAction(
  '[Chats] Load Messages Error',
  props<{ error: string }>(),
);

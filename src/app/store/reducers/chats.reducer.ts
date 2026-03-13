import { createReducer, on } from '@ngrx/store';
import { Message } from '../../models';
import { addMessage, loadMessagesSuccess } from '../actions/chats.actions';

export interface ChatsState {
  messages: Message[];
}

const initialState: ChatsState = {
  messages: [],
};

export const chatsReducer = createReducer(
  initialState,
  on(addMessage, (state, { message }) => ({
    ...state,
    messages: [...state.messages, message],
  })),
  on(loadMessagesSuccess, (state, { messages }) => ({
    ...state,
    messages,
  })),
);

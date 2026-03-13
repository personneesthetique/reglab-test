import { describe, it, expect } from 'vitest';
import { chatsReducer, ChatsState } from './chats.reducer';
import { addMessage, loadMessagesSuccess } from '../actions/chats.actions';

describe('ChatsReducer', () => {
  const initialState: ChatsState = {
    messages: [],
  };

  it('should return initial state for unknown action', () => {
    const action = { type: 'Unknown' } as any;

    const state = chatsReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should add message on addMessage', () => {
    const message = {
      id: '1',
      text: 'Hello',
      userId: '1',
    } as any;

    const action = addMessage({ message });

    const state = chatsReducer(initialState, action);

    expect(state.messages).toEqual([message]);
  });

  it('should append message to existing messages', () => {
    const prevState: ChatsState = {
      messages: [{ id: '1', text: 'Hello', userId: '1' } as any],
    };

    const newMessage = {
      id: '2',
      text: 'Hi!',
      userId: '2',
    } as any;

    const action = addMessage({ message: newMessage });

    const state = chatsReducer(prevState, action);

    expect(state.messages).toEqual([prevState.messages[0], newMessage]);
  });

  it('should replace messages on loadMessagesSuccess', () => {
    const messages = [
      { id: '1', text: 'Hello', userId: '1' },
      { id: '2', text: 'Hi!', userId: '2' },
    ] as any;

    const action = loadMessagesSuccess({ messages });

    const state = chatsReducer(initialState, action);

    expect(state.messages).toEqual(messages);
  });

  it('should not mutate previous state', () => {
    const message = {
      id: '1',
      text: 'Hello',
      userId: '1',
    } as any;

    const action = addMessage({ message });

    const state = chatsReducer(initialState, action);

    expect(state).not.toBe(initialState);
    expect(state.messages).not.toBe(initialState.messages);
  });
});

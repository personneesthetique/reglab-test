import { ActionReducerMap } from '@ngrx/store';
import { AuthState, authReducer } from './reducers/auth.reducer';
import { ChannelsState, channelsReducer } from './reducers/channels.reducer';
import { chatsReducer, ChatsState } from './reducers/chats.reducer';

export interface AppState {
  auth: AuthState;
  channels: ChannelsState;
  chats: ChatsState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  channels: channelsReducer,
  chats: chatsReducer,
};

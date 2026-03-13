import { createSelector } from '@ngrx/store';
import { AppState } from '..';
import { selectUser } from './auth.selectors';
import { selectSelectedChannel } from './channels.selectors';

export const selectChatState = (state: AppState) => state.chats;

export const selectMessages = createSelector(
  selectChatState,
  (state) => state.messages,
);

export const selectMessagesForSelectedChannel = createSelector(
  selectMessages,
  selectSelectedChannel,
  selectUser,
  (messages, channel, user) => {
    if (!channel || !user) return [];

    if (channel.type === 'channel') {
      return messages.filter((m) => m.channelId === channel.id);
    }

    return messages.filter(
      (m) =>
        (m.fromUser === user.username && m.channelId === channel.id) ||
        (m.fromUser === channel.id && m.channelId === user.username),
    );
  },
);

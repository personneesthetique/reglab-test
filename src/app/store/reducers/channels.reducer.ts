import { createReducer, on } from '@ngrx/store';
import { Channel } from '../../models';
import { changeChannel } from '../actions/channels.actions';

export interface ChannelsState {
  selectedChannel: Channel | null;
}

const initialState: ChannelsState = {
  selectedChannel: null,
};

export const channelsReducer = createReducer(
  initialState,
  on(changeChannel, (state, { channel }) => ({
    ...state,
    selectedChannel: channel,
  })),
);

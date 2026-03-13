import { createSelector } from '@ngrx/store';
import { AppState } from '..';

const selectChannelsState = (state: AppState) => state.channels;

export const selectSelectedChannel = createSelector(
  selectChannelsState,
  (state) => state.selectedChannel,
);

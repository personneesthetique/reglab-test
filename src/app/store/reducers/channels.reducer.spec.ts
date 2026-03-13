import { describe, it, expect } from 'vitest';
import { channelsReducer, ChannelsState } from './channels.reducer';
import { changeChannel } from '../actions/channels.actions';

import { provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';
import { Channels } from '../../components/channels/channels';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [Channels],
    providers: [provideMockStore({})],
  }).compileComponents();
});

describe('ChannelsReducer', () => {
  const initialState: ChannelsState = {
    selectedChannel: null,
  };

  it('should return initial state for unknown action', () => {
    const action = { type: 'Unknown' } as any;

    const state = channelsReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should set selectedChannel on changeChannel', () => {
    const channel = {
      id: '1',
      name: 'general',
    } as any;

    const action = changeChannel({ channel });

    const state = channelsReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      selectedChannel: channel,
    });
  });

  it('should replace previously selected channel', () => {
    const prevState: ChannelsState = {
      selectedChannel: { id: '1', name: 'general' } as any,
    };

    const newChannel = {
      id: '2',
      name: 'random',
    } as any;

    const action = changeChannel({ channel: newChannel });

    const state = channelsReducer(prevState, action);

    expect(state.selectedChannel).toEqual(newChannel);
  });

  it('should not mutate previous state', () => {
    const channel = { id: '1', name: 'general' } as any;

    const action = changeChannel({ channel });

    const state = channelsReducer(initialState, action);

    expect(state).not.toBe(initialState);
  });
});

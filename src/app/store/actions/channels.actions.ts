import { createAction, props } from '@ngrx/store';
import { Channel } from '../../models';

export const changeChannel = createAction(
  '[Channels] Change Channel',
  props<{ channel: Channel | null }>(),
);

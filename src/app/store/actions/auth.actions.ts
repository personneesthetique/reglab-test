import { createAction, props } from '@ngrx/store';
import { User, UserCredentials } from '../../models';

export const logInUser = createAction(
  '[Auth] Log In User',
  props<UserCredentials>(),
);

export const logInUserSuccess = createAction(
  '[Auth] Log In User Success',
  props<{ user: User }>(),
);
export const logInUserError = createAction(
  '[Auth] Log In User Error',
  props<{ error: string }>(),
);
export const logOutUser = createAction(
  '[Auth] Log Out User',
  props<{ userId: string }>(),
);

export const checkAuth = createAction('[Auth] Check Auth');

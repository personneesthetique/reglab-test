import { createSelector } from '@ngrx/store';
import { AppState } from '..';

export const selectAuthState = (state: AppState) => state.auth;

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user,
);

export const selectUsername = createSelector(
  selectUser,
  (user) => user?.username,
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated,
);

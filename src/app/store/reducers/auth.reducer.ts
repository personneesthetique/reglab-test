import { createReducer, on } from '@ngrx/store';
import { User } from '../../models';
import {
  logInUserSuccess,
  logInUserError,
  logOutUser,
} from '../actions/auth.actions';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loginInAt: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loginInAt: null,
};

export const authReducer = createReducer(
  initialState,
  on(logInUserSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    loginInAt: new Date().toISOString(),
  })),

  on(logInUserError, (state) => ({
    ...state,
    isAuthenticated: false,
  })),

  on(logOutUser, (state) => ({
    ...state,
    user: null,
    isAuthenticated: false,
    loginInAt: null,
  })),
);

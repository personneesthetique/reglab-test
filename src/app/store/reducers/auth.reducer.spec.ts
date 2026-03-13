import { describe, it, expect } from 'vitest';
import { authReducer, AuthState } from './auth.reducer';
import { logInUserSuccess, logInUserError } from '../actions/auth.actions';

describe('AuthReducer', () => {
  const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loginInAt: null,
  };

  it('should return the initial state for unknown action', () => {
    const action = { type: 'Unknown Action' } as any;

    const state = authReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should set user and authenticate on logInUserSuccess', () => {
    const user = {
      id: '1',
      username: 'test-user',
      isOnline: false,
      password: '111',
    };

    const action = logInUserSuccess({ user });

    const state = authReducer(initialState, action);

    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
    expect(state.loginInAt).not.toBeNull();
    expect(typeof state.loginInAt).toBe('string');
  });

  it('should set isAuthenticated to false on logInUserError', () => {
    const prevState: AuthState = {
      user: {
        id: '1',
        username: 'test-user',
        isOnline: false,
        password: '111',
      },
      isAuthenticated: true,
      loginInAt: null,
    };

    const action = logInUserError({ error: 'Invalid credentials' });

    const state = authReducer(prevState, action);

    expect(state).toEqual({
      ...prevState,
      isAuthenticated: false,
    });
  });
});

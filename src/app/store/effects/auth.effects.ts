import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, tap } from 'rxjs';
import { Auth } from '../../api';
import { Router } from '@angular/router';
import {
  logInUser,
  logInUserSuccess,
  logInUserError,
  logOutUser,
  checkAuth,
} from '../actions/auth.actions';
import { Store } from '@ngrx/store';
import { changeChannel } from '../actions/channels.actions';
import { SESSION_STORAGE } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  private actions$ = inject(Actions);
  private auth = inject(Auth);
  private router = inject(Router);
  private store = inject(Store);
  private sessionStorage = inject(SESSION_STORAGE);

  readonly USER_KEY = 'user';

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logInUser),
      switchMap(({ username, password }) =>
        this.auth.logIn({ username, password }).pipe(
          map((user) => logInUserSuccess({ user })),
          catchError((error) => of(logInUserError(error))),
        ),
      ),
    ),
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logInUserSuccess),
        tap(({ user }) =>
          this.sessionStorage.setItem(this.USER_KEY, JSON.stringify(user)),
        ),
      ),
    { dispatch: false },
  );

  redirectAfterLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logInUserSuccess),
        tap(() => this.router.navigate(['user'])),
      ),
    { dispatch: false },
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logOutUser),
        tap(() => {
          this.sessionStorage.removeItem(this.USER_KEY);
          this.router.navigate(['']);
          this.store.dispatch(changeChannel({ channel: null }));
        }),
      ),
    { dispatch: false },
  );

  checkAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkAuth),
      map(() => {
        const storedUser = this.sessionStorage.getItem(this.USER_KEY);

        if (!storedUser) return logInUserError({ error: 'No session' });

        const user = JSON.parse(storedUser);
        return logInUserSuccess({ user });
      }),
    ),
  );
}

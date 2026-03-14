import { inject, Injectable } from '@angular/core';
import { UserCredentials } from '../models';
import { of, switchMap, throwError } from 'rxjs';
import { UsersApi } from './users-api';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  readonly usersApi = inject(UsersApi);

  logIn(credentials: UserCredentials) {
    const user = this.usersApi
      .getUsers()
      .find(
        ({ username, password }) =>
          username === credentials.username &&
          password === credentials.password,
      );

    return of(user).pipe(
      switchMap((foundUser) =>
        foundUser ? of(foundUser) : throwError(() => new Error('Auth Error')),
      ),
    );
  }
}

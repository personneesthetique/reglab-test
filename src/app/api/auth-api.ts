import { inject, Injectable } from '@angular/core';
import { UserCredentials } from '../models';
import { of, throwError } from 'rxjs';
import { UsersApi } from './users-api';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly usersApi = inject(UsersApi);

  logIn(credentials: UserCredentials) {
    const user = this.usersApi
      .getUsers()
      .find(
        ({ username, password }) =>
          username === credentials.username &&
          password === credentials.password,
      );

    if (!user) return throwError(() => new Error('Auth Error'));

    return of(user);
  }
}

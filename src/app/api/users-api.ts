import { inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '../app.config';
import { User, UserCredentials } from '../models';
import { interval, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class UsersApi {
  readonly localStorage = inject(LOCAL_STORAGE);

  readonly USERS_KEY = 'users';

  private readonly MOCK_USERS = [
    {
      id: '1',
      username: 'user1',
      password: 'user1',
      isOnline: false,
    },
    {
      id: '2',
      username: 'user2',
      password: 'user2',
      isOnline: false,
    },
    {
      id: '3',
      username: 'user3',
      password: 'user3',
      isOnline: false,
    },
  ];

  constructor() {
    this.setUsers(this.MOCK_USERS);
  }

  private setUsers(users: User[]) {
    this.localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  public updateUserStatus(userId: string, isOnline: boolean) {
    const updatedUsers = this.getUsers().map((user) =>
      user.id === userId ? { ...user, isOnline } : user,
    );

    this.setUsers(updatedUsers);
  }

  getUserByUsername(username: string) {
    return this.getUsers().find((user) => user.username === username);
  }

  public getUsers(): User[] {
    const storedUsers = this.localStorage.getItem(this.USERS_KEY);

    if (!storedUsers) return [];

    return JSON.parse(storedUsers);
  }

  getUserStatus(username: string) {
    const user = this.getUserByUsername(username);

    if (!user) return false;

    return user.isOnline;
  }
}

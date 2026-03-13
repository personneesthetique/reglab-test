import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersApi {
  readonly MOCK_USERS = [
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

  getUsers() {
    return this.MOCK_USERS;
  }
}

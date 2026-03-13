import { BaseEntity } from '.';

export interface UserCredentials {
  username: string;
  password: string;
}

export interface User extends BaseEntity, UserCredentials {
  isOnline: boolean;
}

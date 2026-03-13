import { BaseEntity } from './base-entity';

export interface Channel extends BaseEntity {
  name: string;
  type: 'channel' | 'dm';
}

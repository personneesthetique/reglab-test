import { BaseEntity } from './base-entity';

export interface Message extends BaseEntity {
  fromUser: string;
  channelId: string;
  content: string;
}

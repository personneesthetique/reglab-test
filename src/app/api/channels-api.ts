import { computed, inject, Injectable } from '@angular/core';
import { Channel } from '../models';
import { selectUsername } from '../store/selectors/auth.selectors';
import { selectSelectedChannel } from '../store/selectors/channels.selectors';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class ChannelsApi {
  private readonly store = inject(Store);

  private readonly MOCK_CHANNELS: Channel[] = [
    { id: 'general', name: 'general', type: 'channel' },
    { id: 'summer', name: 'summer', type: 'channel' },
    { id: 'party', name: 'party', type: 'channel' },
  ];

  private readonly MOCK_CHANNELS_MEMBERS = new Map<string, string[]>([
    ['general', ['user3']],
    ['summer', ['user1', 'user2', 'user3']],
    ['party', ['user1', 'user3']],
  ]);

  private readonly MOCK_DIRECT_CHATS = new Map<string, string[]>([
    ['user1', ['user2', 'user3']],
    ['user2', ['user1', 'user3']],
    ['user3', ['user1', 'user2']],
  ]);

  selectedChannel = this.store.selectSignal(selectSelectedChannel);
  username = this.store.selectSignal(selectUsername);

  userChannels = computed(() => {
    const username = this.username();
    if (!username) return { channels: [], directChats: [] };
    return this.getUserChannels(username);
  });

  getUserChannels(username: string) {
    const channels = this.MOCK_CHANNELS.filter((channel) =>
      this.MOCK_CHANNELS_MEMBERS.get(channel.id)?.includes(username),
    );

    const directChats: Channel[] = (
      this.MOCK_DIRECT_CHATS.get(username) ?? []
    ).map((dmUsername) => ({
      id: dmUsername,
      name: dmUsername,
      type: 'dm',
    }));

    return { channels, directChats };
  }
}

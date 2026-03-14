import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChannelsApi } from '../../api/channels-api';
import { Store } from '@ngrx/store';
import { selectSelectedChannel } from '../../store/selectors/channels.selectors';
import { changeChannel } from '../../store/actions/channels.actions';
import { UsersApi } from '../../api';

@Component({
  selector: 'app-channels',
  imports: [],
  templateUrl: './channels.html',
  styleUrl: './channels.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Channels {
  readonly channelsApi = inject(ChannelsApi);
  readonly usersApi = inject(UsersApi);
  readonly store = inject(Store);

  protected readonly selectedChannel = this.store.selectSignal(
    selectSelectedChannel,
  );

  selectChannel(channelId: string) {
    if (!channelId) return;

    const { channels, directChats } = this.channelsApi.userChannels();

    const channel = [...channels, ...directChats].find(
      (c) => c.id === channelId,
    );

    if (channel) {
      this.store.dispatch(changeChannel({ channel }));
    }
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Channels, Chat } from '../../components';
import { UserBar } from '../../shared';
import { Store } from '@ngrx/store';
import { logOutUser } from '../../store/actions/auth.actions';
import {
  selectUser,
  selectUsername,
} from '../../store/selectors/auth.selectors';
import { selectSelectedChannel } from '../../store/selectors/channels.selectors';
import { loadMessages } from '../../store/actions/chats.actions';

@Component({
  selector: 'app-user-page',
  imports: [UserBar, Channels, Chat],
  templateUrl: './user-page.html',
  styleUrl: './user-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPage {
  readonly store = inject(Store);

  protected user = this.store.selectSignal(selectUser);
  protected selectedChannelId = this.store.selectSignal(selectSelectedChannel);

  constructor() {
    this.store.dispatch(loadMessages());
  }

  logOut() {
    this.store.dispatch(logOutUser({ userId: this.user()!.id }));
  }
}

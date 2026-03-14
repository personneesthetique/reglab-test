import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
} from '@angular/core';
import { Channels, Chat } from '../../components';
import { UserBar } from '../../shared';
import { Store } from '@ngrx/store';
import { logOutUser } from '../../store/actions/auth.actions';
import { selectUser } from '../../store/selectors/auth.selectors';
import { selectSelectedChannel } from '../../store/selectors/channels.selectors';
import { loadMessages } from '../../store/actions/chats.actions';
import { UsersApi } from '../../api';

@Component({
  selector: 'app-user-page',
  imports: [UserBar, Channels, Chat],
  templateUrl: './user-page.html',
  styleUrl: './user-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPage {
  readonly store = inject(Store);
  readonly usersApi = inject(UsersApi);

  protected user = this.store.selectSignal(selectUser);
  protected selectedChannelId = this.store.selectSignal(selectSelectedChannel);

  constructor() {
    this.store.dispatch(loadMessages());
  }

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: BeforeUnloadEvent) {
    this.usersApi.updateUserStatus(this.user()!.id, false);
  }

  logOut() {
    this.store.dispatch(logOutUser({ userId: this.user()!.id }));
  }
}

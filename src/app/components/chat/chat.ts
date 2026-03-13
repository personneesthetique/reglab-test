import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectMessagesForSelectedChannel } from '../../store/selectors/chats.selectors';
import { sendMessage } from '../../store/actions/chats.actions';
import { selectSelectedChannel } from '../../store/selectors/channels.selectors';

@Component({
  selector: 'app-chat',
  imports: [],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Chat {
  readonly store = inject(Store);

  messages = this.store.selectSignal(selectMessagesForSelectedChannel);
  selectedChannel = this.store.selectSignal(selectSelectedChannel);

  sendMessage(content: string) {
    this.store.dispatch(sendMessage({ content }));
  }
}

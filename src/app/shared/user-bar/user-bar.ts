import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-user-bar',
  imports: [],
  templateUrl: './user-bar.html',
  styleUrl: './user-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserBar {
  username = input<string>();

  logOutButtonClicked = output();
  settingsButtonClicked = output();
}

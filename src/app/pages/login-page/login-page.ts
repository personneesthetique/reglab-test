import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApi } from '../../api/auth-api';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { logInUser, logInUserError } from '../../store/actions/auth.actions';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, CommonModule, ToastModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  readonly fb = inject(FormBuilder);
  readonly authApi = inject(AuthApi);
  readonly store = inject(Store);
  readonly messageService = inject(MessageService);

  protected loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  logInUserErrorSelect = this.store.selectSignal(logInUserError);

  logInUserErrorEffect = effect(() => {
    const error = this.logInUserErrorSelect();

    if (!error) return;

    this.messageService.add({
      severity: 'error',
      summary: 'Ошибка аутентификации',
      detail: 'Обратитесь в компанию RegLab',
    });
  });

  protected login() {
    if (this.loginForm.invalid) return;

    const credentials = this.loginForm.getRawValue();

    this.store.dispatch(logInUser(credentials));
  }
}

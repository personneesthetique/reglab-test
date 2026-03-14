import {
  ApplicationConfig,
  InjectionToken,
  isDevMode,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { reducers } from './store';
import { AuthEffects } from './store/effects/auth.effects';
import { ChatsEffects } from './store/effects/chats.effects';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/Aura';

export const SOCKET_NAME = 'socket';

export const LOCAL_STORAGE = new InjectionToken<typeof localStorage>(
  'localStorage',
);
export const SESSION_STORAGE = new InjectionToken<typeof sessionStorage>(
  'sessionStorage',
);
export const SOCKET = new InjectionToken<BroadcastChannel>('socket');

export const POLLING_INTERVAL = new InjectionToken<number>('polling');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(reducers),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(AuthEffects, ChatsEffects),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
        },
      },
    }),
    MessageService,
    {
      provide: LOCAL_STORAGE,
      useValue: localStorage,
    },
    {
      provide: SESSION_STORAGE,
      useValue: sessionStorage,
    },
    {
      provide: SOCKET,
      useValue: new BroadcastChannel(SOCKET_NAME),
    },
    {
      provide: POLLING_INTERVAL,
      useValue: 200,
    },
  ],
};

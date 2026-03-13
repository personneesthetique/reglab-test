import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './guards';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/').then((c) => c.MainPage),
    canActivate: [],
    canDeactivate: [],
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/').then((c) => c.LoginPage),
    canActivate: [guestGuard],
    canDeactivate: [],
  },
  {
    path: 'user',
    loadComponent: () => import('./pages/').then((c) => c.UserPage),
    canActivate: [authGuard],
    canDeactivate: [],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

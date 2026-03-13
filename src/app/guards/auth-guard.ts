import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../api/auth-api';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../store/selectors/auth.selectors';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store
    .select(selectIsAuthenticated)
    .pipe(map((isAuth) => isAuth || router.createUrlTree(['login'])));
};

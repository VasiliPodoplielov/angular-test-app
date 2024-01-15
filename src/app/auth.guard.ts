import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('IT WORKS: ', { route, state });
  const router: Router = inject(Router);
  const user = localStorage.getItem('user');

  if (!!user) {
    return true;
  }

  return router.createUrlTree(['/auth']);
};

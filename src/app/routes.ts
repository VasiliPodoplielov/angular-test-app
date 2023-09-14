import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
]

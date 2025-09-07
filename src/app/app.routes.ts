import { Routes } from '@angular/router';

export const routes: Routes = [
  // just an example
  {
    path: 'dashboard',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
];

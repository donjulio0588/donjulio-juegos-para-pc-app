import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    //redirectTo: '/games',
    pathMatch: 'full',
    //loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
    loadComponent: () => import('./clients/home/main-landing-page').then((m) => m.MainLandingPage),
  },
  {
    path: 'games',
    loadComponent: () =>
      import('./clients/games-module/main-container').then((m) => m.MainContainer),
  },
  {
    path: 'add-edit-game',
    loadComponent: () =>
      import('./clients/games-module/components/game-add-edit/game-add-edit').then(
        (m) => m.GameAddEdit
      ),
  },
  {
    path: 'add-edit-game/:id',
    loadComponent: () =>
      import('./clients/games-module/components/game-add-edit/game-add-edit').then(
        (m) => m.GameAddEdit
      ),
  },
];

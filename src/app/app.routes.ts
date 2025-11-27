import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./clients/home/main-landing-page').then((m) => m.MainLandingPage),
  },
  {
    path: 'games',
    loadComponent: () =>
      import('./clients/games-module/main-container').then((m) => m.MainContainer),
  },
  {
    path: 'games/search',
    loadComponent: () =>
      import('./shared/components/search-results-view/search-results-view').then((m) => m.SearchResultsView),
  },
  {
    path: 'games/:gameName',
    loadComponent: () =>
      import('./clients/games-module/components/single-game-detail/single-game-detail').then(
        (m) => m.SingleGameDetail
      ),
  },
  {
    path: 'games/page/:pageNumber',
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

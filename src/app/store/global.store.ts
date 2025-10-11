import { inject, InjectionToken, OnInit } from '@angular/core';
import { Game } from '@app/core/models';
import { FetchGames } from '@app/core/services/fetch-games';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { lastValueFrom } from 'rxjs';

type StoreState = {
  games: Game[];
};

const initialState: StoreState = {
  games: [],
};

const STORE_STATE = new InjectionToken<StoreState>('GlobalStore', {
  factory: () => initialState,
});

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withState(() => inject(STORE_STATE)),

  withMethods((store, gameService = inject(FetchGames)) => ({
    getGame(id: number) {
      return store.games().find((game) => game.id === id);
    },

    async addGame(game: Omit<Game, 'id'>) {
      try {
        await lastValueFrom(gameService.addGame(game));
        patchState(store, ({ games }) => ({
          games: [...games, { id: new Date().getTime(), ...game }],
        }));
      } catch (error) {}
    },

    async removeGame(id: number) {
      try {
        await lastValueFrom(gameService.removeGame(id));

        patchState(store, ({ games }) => ({
          games: games.filter((game) => game.id !== id),
          //isLoading: false,
        }));
      } catch (error) {}
    },

    async updateGame(game: Game) {
      try {
        await lastValueFrom(gameService.updateGame(game));

        patchState(store, ({ games }) => ({
          games: games.map((currentGame) =>
            currentGame.id === game.id ? { ...currentGame, ...game } : currentGame
          ),
          //isLoading: false,
        }));
      } catch (error) {}
    },
  })),

  withHooks({
    async onInit(store, gameService = inject(FetchGames)) {
      const games = await lastValueFrom(gameService.getAllGames());
      patchState(store, { games });
    },
  })
);

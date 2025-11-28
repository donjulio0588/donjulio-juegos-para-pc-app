import { effect, inject, input } from '@angular/core';
import { Game, GameInfo } from '@app/core/models';
import { DataFromLocalStoage } from '@app/core/services/dataFromLocalStorage.service';
import { FetchGames } from '@app/core/services/fetch-games.service';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { lastValueFrom, map, Observer } from 'rxjs';

//import { v4 as uuid } from 'uuid';

type StoreState = {
  gamesData: GameInfo;
};

const initialState: StoreState = {
  gamesData: {
    total: 0,
    totalPages: 0,
    page: 0,
    pageSize: 0,
    games: [],
  },
};

// const STORE_STATE = new InjectionToken<StoreState>('GlobalStore', {
//   factory: () => initialState,
// });

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((store, gameService = inject(FetchGames)) => ({
    getGame(id: string) {
      return store.gamesData.games().find((game) => game.id === id);
    },

    getGameByFriendlyUrl(friendlyUrl: string) {
      return store.gamesData.games().find((game) => game.friendly_url === friendlyUrl);
    },

    async addGame(game: Omit<Game, 'id'>) {
      // try {
      //   await lastValueFrom(gameService.addGame(game));
      //   patchState(store, ({ games }) => ({
      //     games: [...games, { id: uuid(), ...game }],
      //   }));
      // } catch (error) {}
    },

    async removeGame(id: string) {
      // try {
      //   await lastValueFrom(gameService.removeGame(id));
      //   patchState(store, ({ games }) => ({
      //     games: games.filter((game) => game.id !== id),
      //     //isLoading: false,
      //   }));
      // } catch (error) {}
    },

    async updateGame(game: Game) {
      // try {
      //   await lastValueFrom(gameService.updateGame(game));
      //   patchState(store, ({ games }) => ({
      //     games: games.map((currentGame) =>
      //       currentGame.id === game.id ? { ...currentGame, ...game } : currentGame
      //     ),
      //     //isLoading: false,
      //   }));
      // } catch (error) {}
    },

    async updateEntireState(gamesData: GameInfo) {
      patchState(store, { gamesData });
    },
  })),

  withHooks({
    async onInit(store, gameService = inject(FetchGames), urlData = inject(DataFromLocalStoage)) {
      const pageSize =
        Number(urlData.getItemFromLocalStorage('donJulio[JuegosParaPc]GamesPageSize')) || 30;
      const pageNumber = 1; //should be taken from the url 🤨

      const gamesData = await lastValueFrom(gameService.getAllGames(pageSize, pageNumber + 1));

      patchState(store, { gamesData });
    },
  })
);

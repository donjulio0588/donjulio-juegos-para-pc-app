import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GlobalStore } from '@app/store';
import { GameCard } from './components/game-preview-card/game-preview-card';
import { RouterLink } from '@angular/router';
import { MainNavBar } from '@app/shared/components/main-nav-bar/main-nav-bar';
import { SearchBar } from '@app/shared/components/search-bar/search-bar';
//import { CustomInputComponent } from '@app/shared/components/custom-input/custom-input';
import { GamesCarousel } from '@app/shared/components/carrousel/carrousel';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { FetchGames } from '@app/core/services/fetch-games';
import { lastValueFrom } from 'rxjs';
import { patchState } from '@ngrx/signals';
import { GameInfo } from '@app/core/models';

@Component({
  selector: 'app-main-container',
  imports: [GameCard, MainNavBar, SearchBar, GamesCarousel, PaginatorModule],
  templateUrl: './main-container.html',
  styleUrl: './main-container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContainer {
  store = inject(GlobalStore);

  storedPageSize?: null | string;
  totalOfRecords: number = 0;
  first: number = 0;
  rows: number = 30;
  gameService = inject(FetchGames);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Access localStorage here, as it's guaranteed to be available
      this.storedPageSize = localStorage.getItem('donJulio[JuegosParaPc]GamesPageSize');

      if (!this.storedPageSize) {
        localStorage.setItem('donJulio[JuegosParaPc]GamesPageSize', JSON.stringify(this.rows));
      }
      //updates selector field when the page loads
      this.rows = Number(this.storedPageSize);
    } else {
      // Handle cases where localStorage is not available (e.g., during SSR)
      //console.log('localStorage is not available on the server.');
    }
  }

  fetchGamesAPI = async (pageSize: number, pageNumber: number) => {
    //console.log(pageSize, pageNumber);
    const gamesData = await lastValueFrom(this.gameService.getAllGames(pageSize, pageNumber));

    this.store.updateEntireState(gamesData);
    //patchState(this.store, { gamesData });
    //console.log(gamesData);
  };

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;

    //updates the localstorage every time rows(cards) changes
    event.rows &&
      localStorage.setItem('donJulio[JuegosParaPc]GamesPageSize', JSON.stringify(event.rows));
    // console.log(event.page);
    // console.log(event.rows);
    this.fetchGamesAPI(event.rows as number, event.page as number);
    //console.log(this.store.gamesData());
  }
}

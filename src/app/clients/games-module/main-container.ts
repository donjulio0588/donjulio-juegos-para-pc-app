import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Location } from '@angular/common';
import { GlobalStore } from '@app/store';
import { GameCard } from './components/game-preview-card/game-preview-card';
import { ActivatedRoute } from '@angular/router';
import { MainNavBar } from '@app/shared/components/main-nav-bar/main-nav-bar';
import { SearchBar } from '@app/shared/components/search-bar/search-bar';
import { GamesCarousel } from '@app/shared/components/carrousel/carrousel';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { FetchGames } from '@app/core/services/fetch-games';
import { lastValueFrom } from 'rxjs';
import { DataFromLocalStoage } from '@app/core/services/dataFromLocalStorage';

@Component({
  selector: 'app-main-container',
  imports: [GameCard, MainNavBar, SearchBar, GamesCarousel, PaginatorModule],
  templateUrl: './main-container.html',
  styleUrl: './main-container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContainer implements OnInit {
  store = inject(GlobalStore);
  localStorageService = inject(DataFromLocalStoage);

  private pageNumber: number = 0;
  first: number = 0;
  rows: number = 0;
  gameService = inject(FetchGames);

  constructor(private location: Location, private route: ActivatedRoute) {
    this.pageNumber = route.snapshot.params['pageNumber'];
    this.rows =
      Number(
        this.localStorageService.getItemFromLocalStorage('donJulio[JuegosParaPc]GamesPageSize')
      ) || 30;
    this.first = this.rows * (this.pageNumber - 1);
  }

  //call the api every time a page is changed
  fetchGamesAPI = async (pageSize: number, pageNumber: number) => {
    const gamesData = await lastValueFrom(this.gameService.getAllGames(pageSize, pageNumber));
    this.store.updateEntireState(gamesData); //improve in the future
  };

  //UI component logic
  onPageChange(event: PaginatorState) {
    this.first = event.first ?? this.first;

    //updates the localstorage every time rows(number of cards per page) or page number change
    event.rows !== this.rows &&
      this.localStorageService.setItemToLocalStorage(
        'donJulio[JuegosParaPc]GamesPageSize',
        JSON.stringify(event.rows)
      );

    if (event.rows !== this.rows) this.rows = event.rows ?? this.rows;

    this.location.replaceState(`games/page/${event.page ? event.page + 1 : 1}`); //update url
    this.fetchGamesAPI(event.rows as number, (event.page as number) + 1); //call the api again
  }

  ngOnInit(): void {
    //improve in the future, i'm calling the api and updating the store getting the pageSize from the localStorage
    // though a service and the pageNumber from the url, at this moment i can't get pageNumber data directly from the url
    // inside the global store withHooks method
    this.fetchGamesAPI(this.rows as number, this.pageNumber);
  }
}

import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SelectedGameService } from '@app/core/services/selected-game.service';
import { computed } from '@angular/core';
import { MainNavBar } from '@app/shared/components/main-nav-bar/main-nav-bar';
import { FirstWordsPipe } from '@app/shared/pipes/first-words.pipe';
import { UpperCasePipe } from '@angular/common';
import { GlobalStore } from '@app/store';
import { Game } from '@app/core/models';
import { FetchGames } from '@app/core/services/fetch-games';
import { DataFromLocalStoage } from '@app/core/services/dataFromLocalStorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-game-detail',
  imports: [MainNavBar, FirstWordsPipe, UpperCasePipe],
  templateUrl: './single-game-detail.html',
  styleUrl: './single-game-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleGameDetail implements OnInit {
  private selectedGameService = inject(SelectedGameService);
  private store = inject(GlobalStore);
  private storedPageSize = inject(DataFromLocalStoage);
  private gameService = inject(FetchGames);
  private route = inject(Router);
  protected selectedGame = computed(() => this.selectedGameService.getSelectedGame()());
  protected imageGallery: Array<string | undefined> = [
    this.selectedGame()?.image1,
    this.selectedGame()?.image2,
    this.selectedGame()?.image3,
    this.selectedGame()?.image4,
  ];

  ngOnInit(): void {
    //if no game is selected, fetch it from the store or the API
    if (!this.selectedGame()) {
      const friendlyUrl = this.route.url.split('/').pop() || '';
      const pageSize = this.storedPageSize.getItemFromLocalStorage(
        'donJulio[JuegosParaPc]GamesPageSize'
      );

      //fetch the game data from the API
      const requestedGame = this.gameService.getAllGames(Number(pageSize), 1);

      requestedGame.subscribe((gameInfo) => {
        //populate the store with the fetched game
        this.store.updateEntireState(gameInfo);

        //find the game in the store by friendly url
        const foundedGame = this.store.getGameByFriendlyUrl(friendlyUrl);

        //set the selected game
        this.selectedGameService.setSelectedGame(foundedGame as Game);

        this.imageGallery = [
          foundedGame?.image1,
          foundedGame?.image2,
          foundedGame?.image3,
          foundedGame?.image4,
        ];
      });
    }
  }
}

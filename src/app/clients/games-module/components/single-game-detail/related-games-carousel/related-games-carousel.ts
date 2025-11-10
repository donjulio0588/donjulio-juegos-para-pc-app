import { ChangeDetectionStrategy, inject, input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
//import { Product } from '@/domain/product';
//import { ProductService } from '@/service/productservice';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { GlobalStore } from '@app/store';
import { Game, RelatedGamesInitialState, RelatedGames } from '@app/core/models';
import { SingleRelatedGameAdapter } from '@app/core/adapters/related.games.adapter';
import { clsx } from 'clsx';
import { UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SelectedGameService } from '@app/core/services/selected-game.service';
import { FetchGames } from '@app/core/services/fetch-games';

@Component({
  selector: 'app-related-games-carousel',
  imports: [Carousel, ButtonModule, Tag, UpperCasePipe, RouterLink],
  templateUrl: './related-games-carousel.html',
  styleUrl: './related-games-carousel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelatedGamesCarousel implements OnInit {
  relatedGameList = input.required<Array<Game>>();
  private selectedGameService = inject(SelectedGameService);
  private gameService = inject(FetchGames);
  store = inject(GlobalStore);
  adaptedDataForCarousel: Array<RelatedGames> = [RelatedGamesInitialState];
  responsiveOptions: any[] | undefined;
  gameNameForUrl: string = '';

  ngOnInit() {
    this.adaptedDataForCarousel = SingleRelatedGameAdapter(this.relatedGameList());
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
    // console.log(this.adaptedDataForCarousel);
  }

  // getSeverity(status: boolean) {
  //   switch (status) {
  //     case true:
  //       return 'success';
  //     // case 0:
  //     //   return 'warn';
  //     case false:
  //       return 'danger';
  //   }
  // }

  // setSelectedGame(gameFriendlyUrl: string) {
  //   const requestSelectedGame = this.gameService.getOneGameByFriendlyUrl(gameFriendlyUrl);

  //   requestSelectedGame.subscribe((game) => {
  //     console.log(game);
  //     this.selectedGameService.setSelectedGame(game);
  //   });
  // }

  // setSelectedGame(selectedGameId: string) {
  //   const gameWithCalculatedData = this.gameService.getOneGameByFriendlyUrl(selectedGameId);

  //   gameWithCalculatedData.subscribe((game: Game) => {
  //     this.selectedGameService.setSelectedGame(game);
  //     this.imageGallery = [
  //       {
  //         itemImageSrc: `http://localhost:4000/api/games/images/game-images/splash1/${gameInfo.image1}`,
  //         thumbnailImageSrc: `http://localhost:4000/api/games/images/game-images/splash1/${gameInfo.image1}`,
  //         alt: 'Description for Image 1',
  //         title: 'Title 1',
  //       },
  //       {
  //         itemImageSrc: `http://localhost:4000/api/games/images/game-images/splash2/${gameInfo.image2}`,
  //         thumbnailImageSrc: `http://localhost:4000/api/games/images/game-images/splash2/${gameInfo.image2}`,
  //         alt: 'Description for Image 2',
  //         title: 'Title 2',
  //       },
  //       {
  //         itemImageSrc: `http://localhost:4000/api/games/images/game-images/splash3/${gameInfo.image3}`,
  //         thumbnailImageSrc: `http://localhost:4000/api/games/images/game-images/splash3/${gameInfo.image3}`,
  //         alt: 'Description for Image 3',
  //         title: 'Title 3',
  //       },
  //       {
  //         itemImageSrc: `http://localhost:4000/api/games/images/game-images/splash4/${gameInfo.image4}`,
  //         thumbnailImageSrc: `http://localhost:4000/api/games/images/game-images/splash4/${gameInfo.image4}`,
  //         alt: 'Description for Image 4',
  //         title: 'Title 4',
  //       },
  //     ];
  //   });
  // }

  availableTagStyle(availability: boolean) {
    return clsx(availability ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800');
  }

  getRelatedGames(relationNumber: number) {
    const allGames = this.store.gamesData().games;
    const filteredRelated = allGames.filter((game) => game.related === relationNumber);
    console.log('Hola');
    console.log(filteredRelated);
  }
}

import { ChangeDetectionStrategy, inject, input, signal, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { GlobalStore } from '@app/store';
import { Game, RelatedGamesInitialState, RelatedGames } from '@app/core/models';
import { SingleRelatedGameAdapter } from '@app/core/adapters/related.games.adapter';
import { clsx } from 'clsx';
import { UpperCasePipe, Location } from '@angular/common';
import { SelectedGameService } from '@app/core/services/selected-game.service';
import { FetchGames } from '@app/core/services/fetch-games';

@Component({
  selector: 'app-related-games-carousel',
  imports: [Carousel, ButtonModule, Tag, UpperCasePipe],
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
  autoPlayInterval = signal(5000);

  @ViewChild('item' as 'carouselComponent') carouselComponent!: Carousel;

  constructor(private location: Location) {}

  ngOnInit() {
    this.adaptedDataForCarousel = SingleRelatedGameAdapter(this.relatedGameList());
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 4,
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

  updateSelectedGame(gameFriendlyUrl: string) {
    const requestSelectedGame = this.gameService.getOneGameByFriendlyUrl(gameFriendlyUrl);

    requestSelectedGame.subscribe((game) => {
      this.selectedGameService.setSelectedGame(game);
      this.selectedGameService.setImageGallery(game);
      this.location?.replaceState(`/games/${gameFriendlyUrl}`);
      this.forceScrollToTop();
    });
  }

  availableTagStyle(availability: boolean) {
    return clsx(availability ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800');
  }

  forceScrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
}

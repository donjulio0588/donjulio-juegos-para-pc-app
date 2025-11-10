import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SelectedGameService } from '@app/core/services/selected-game.service';
import { computed } from '@angular/core';
import { MainNavBar } from '@app/shared/components/main-nav-bar/main-nav-bar';
import { UpperCasePipe, NgClass, CurrencyPipe } from '@angular/common';
import { FetchGames } from '@app/core/services/fetch-games';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import clsx from 'clsx';
import { filter, pipe } from 'rxjs';
import { RelatedGamesCarousel } from './related-games-carousel/related-games-carousel';
import { Game } from '@app/core/models';

interface ImageDetails {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt: string;
  title: string;
}

@Component({
  selector: 'app-single-game-detail',
  imports: [
    MainNavBar,
    UpperCasePipe,
    NgClass,
    GalleriaModule,
    CurrencyPipe,
    DividerModule,
    ButtonModule,
    RelatedGamesCarousel,
  ],
  templateUrl: './single-game-detail.html',
  styleUrl: './single-game-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleGameDetail implements OnInit {
  private selectedGameService = inject(SelectedGameService);
  private gameService = inject(FetchGames);
  private route = inject(Router);
  protected selectedGame = computed(() => this.selectedGameService.getSelectedGame()());
  protected imageGallery: Array<ImageDetails | undefined> = [
    {
      itemImageSrc: `http://localhost:4000/api/games/images/game-images/splash1/${
        this.selectedGame()?.image1
      }`,
      thumbnailImageSrc: `http://localhost:4000/api/games/images/game-images/splash1/${
        this.selectedGame()?.image1
      }`,
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
    {
      itemImageSrc: `http://localhost:4000/api/games/images/game-images/splash2/${
        this.selectedGame()?.image2
      }`,
      thumbnailImageSrc: `http://localhost:4000/api/games/images/game-images/splash2/${
        this.selectedGame()?.image2
      }`,
      alt: 'Description for Image 2',
      title: 'Title 2',
    },
    {
      itemImageSrc: `http://localhost:4000/api/games/images/game-images/splash3/${
        this.selectedGame()?.image3
      }`,
      thumbnailImageSrc: `http://localhost:4000/api/games/images/game-images/splash3/${
        this.selectedGame()?.image3
      }`,
      alt: 'Description for Image 3',
      title: 'Title 3',
    },
    {
      itemImageSrc: `http://localhost:4000/api/games/images/game-images/splash4/${
        this.selectedGame()?.image4
      }`,
      thumbnailImageSrc: `http://localhost:4000/api/games/images/game-images/splash4/${
        this.selectedGame()?.image4
      }`,
      alt: 'Description for Image 4',
      title: 'Title 4',
    },
  ];
  protected activeImage:
    | string
    | undefined = `http://localhost:4000/api/games/images/game-images/splash1/${this.imageGallery[0]}`;
  @ViewChild('relatedGamesCarousel') relatedGamesCarousel!: ElementRef;

  responsiveOptions: any[] = [
    {
      breakpoint: '1300px',
      numVisible: 4,
    },
    {
      breakpoint: '968px',
      numVisible: 2,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
    },
  ];

  setActiveImage(imageUrl: string | undefined) {
    if (!imageUrl) return;
    this.activeImage = imageUrl;
  }

  ngOnInit(): void {
    //if no game is selected, fetch it from the store or the API
    if (!this.selectedGame()) {
      const friendlyUrl = this.route.url.split('/').pop() || '';

      //fetch the game data from the API
      const requestedGame = this.gameService.getOneGameByFriendlyUrl(friendlyUrl); // getAllGames(Number(pageSize), 1);

      requestedGame.subscribe((gameInfo) => {
        this.selectedGameService.setSelectedGame(gameInfo);

        this.imageGallery = [
          {
            itemImageSrc: `http://localhost:4000/api/games/images/game-images/splash1/${gameInfo.image1}`,
            thumbnailImageSrc: `http://localhost:4000/api/games/images/game-images/splash1/${gameInfo.image1}`,
            alt: 'Description for Image 1',
            title: 'Title 1',
          },
          {
            itemImageSrc: `http://localhost:4000/api/games/images/game-images/splash2/${gameInfo.image2}`,
            thumbnailImageSrc: `http://localhost:4000/api/games/images/game-images/splash2/${gameInfo.image2}`,
            alt: 'Description for Image 2',
            title: 'Title 2',
          },
          {
            itemImageSrc: `http://localhost:4000/api/games/images/game-images/splash3/${gameInfo.image3}`,
            thumbnailImageSrc: `http://localhost:4000/api/games/images/game-images/splash3/${gameInfo.image3}`,
            alt: 'Description for Image 3',
            title: 'Title 3',
          },
          {
            itemImageSrc: `http://localhost:4000/api/games/images/game-images/splash4/${gameInfo.image4}`,
            thumbnailImageSrc: `http://localhost:4000/api/games/images/game-images/splash4/${gameInfo.image4}`,
            alt: 'Description for Image 4',
            title: 'Title 4',
          },
        ];

        this.activeImage = `http://localhost:4000/api/games/images/game-images/splash1/${this.imageGallery[0]}`;
      });
      // Force scroll to the top
      this.route.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
        //window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        window.location.reload();
      });
      this.route.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      });
    }
  }

  getSteamValoration(steam_valoration: string | null | undefined) {
    return clsx(
      steam_valoration ?? 'text-neutral-400',
      steam_valoration?.toLowerCase() === 'desconocidas' && 'text-neutral-400',
      steam_valoration?.toLowerCase() === 'extremadamente negativas' && 'text-red-900',
      steam_valoration?.toLowerCase() === 'muy negativas' && 'text-red-400',
      steam_valoration?.toLowerCase() === 'negativas' && 'text-green-500',
      steam_valoration?.toLowerCase() === 'variadas' && 'text-yellow-200',
      steam_valoration?.toLowerCase() === 'positivas' && 'text-green-300',
      steam_valoration?.toLowerCase() === 'mayormente positivas' && 'text-green-600',
      steam_valoration?.toLowerCase() === 'muy positivas' && 'text-amber-500',
      steam_valoration?.toLowerCase() === 'extremadamente positivas' && 'text-amber-600'
    );
  }

  relatedGamePersonalizedMessage(): string {
    let relatedMesage = 'No tenemos ningun otro juego de esta saga';
    if (!this.selectedGame()?.calculatedInfo) return relatedMesage;
    const selectedGameRelatedCount = this.selectedGame()?.calculatedInfo.relatedGamesCount ?? 0;

    if (selectedGameRelatedCount == 1) {
      relatedMesage = `Tenemos otro juego relacionado con este.`;
    } else if (selectedGameRelatedCount > 1) {
      relatedMesage = `Tenemos otros ${selectedGameRelatedCount} juegos de esta saga.`;
    }

    return relatedMesage;
  }

  scrollToSection() {
    if (this.relatedGamesCarousel) {
      this.relatedGamesCarousel.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SelectedGameService } from '@app/core/services/selected-game.service';
import { computed } from '@angular/core';
import { MainNavBar } from '@app/shared/components/main-nav-bar/main-nav-bar';
import { UpperCasePipe, NgClass, CurrencyPipe } from '@angular/common';
import { Game } from '@app/core/models';
import { FetchGames } from '@app/core/services/fetch-games';
import { Router } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import clsx from 'clsx';

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
  ],
  templateUrl: './single-game-detail.html',
  styleUrl: './single-game-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleGameDetail implements OnInit {
  private selectedGameService = inject(SelectedGameService);
  private gameService = inject(FetchGames);
  private route = inject(Router);
  clsx = clsx;
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
        //set the selected game
        this.selectedGameService.setSelectedGame(gameInfo as Game);

        this.imageGallery = [
          {
            itemImageSrc: `http://localhost:4000/api/games/images/game-images/splash1/${gameInfo?.image1}`,
            thumbnailImageSrc: `http://localhost:4000/api/games/images/game-images/splash1/${gameInfo?.image1}`,
            alt: 'Description for Image 1',
            title: 'Title 1',
          },
          {
            itemImageSrc: `http://localhost:4000/api/games/images/game-images/splash2/${gameInfo?.image2}`,
            thumbnailImageSrc: `http://localhost:4000/api/games/images/game-images/splash2/${gameInfo?.image2}`,
            alt: 'Description for Image 2',
            title: 'Title 2',
          },
          {
            itemImageSrc: `http://localhost:4000/api/games/images/game-images/splash3/${gameInfo?.image3}`,
            thumbnailImageSrc: `http://localhost:4000/api/games/images/game-images/splash3/${gameInfo?.image3}`,
            alt: 'Description for Image 3',
            title: 'Title 3',
          },
          {
            itemImageSrc: `http://localhost:4000/api/games/images/game-images/splash4/${gameInfo?.image4}`,
            thumbnailImageSrc: `http://localhost:4000/api/games/images/game-images/splash4/${gameInfo?.image4}`,
            alt: 'Description for Image 4',
            title: 'Title 4',
          },
        ];

        this.activeImage = `http://localhost:4000/api/games/images/game-images/splash1/${this.imageGallery[0]}`;
      });
    }
  }

  getSteamValoration(steam_valoration: string | null | undefined) {
    //console.log(this.selectedGame()?.steam_valoration);
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
}

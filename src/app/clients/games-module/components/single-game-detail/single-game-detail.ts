import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
  signal,
} from '@angular/core';
import { SelectedGameService } from '@app/core/services/selected-game.service';
import { computed } from '@angular/core';
import { MainNavBar } from '@app/shared/components/main-nav-bar/main-nav-bar';
import { UpperCasePipe, NgClass, CurrencyPipe } from '@angular/common';
import { FetchGames } from '@app/core/services/fetch-games';
import { NavigationEnd, Router } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import clsx from 'clsx';
import { filter } from 'rxjs';
import { RelatedGamesCarousel } from './related-games-carousel/related-games-carousel';
import { FirstWordsPipe } from '@app/shared/pipes/first-words.pipe';
import { SingleGameImageGallery } from './single-game-image-gallery/single-game-image-gallery';
import { Tooltip } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';

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
    FirstWordsPipe,
    SingleGameImageGallery,
    Tooltip,
    InputTextModule,
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
  //protected imageGallery = computed(() => this.selectedGameService.getImageGallery());
  protected activeImage: string | undefined;
  // Signal to control whether to show the full description or the truncated one
  protected showFullDescription = signal(false);

  @ViewChild('relatedGamesCarousel') relatedGamesCarousel!: ElementRef;
  @ViewChild('issueWarning') issueSection!: ElementRef;

  setActiveImage(imageUrl: string | undefined) {
    if (!imageUrl) return;
    this.activeImage = imageUrl;
  }

  ngOnInit(): void {
    //if no game is selected (on page reload), fetch it from the API
    if (!this.selectedGame()) {
      const friendlyUrl = this.route.url.split('/').pop() || '';

      //fetch the game data from the API
      const requestedGame = this.gameService.getOneGameByFriendlyUrl(friendlyUrl); // getAllGames(Number(pageSize), 1);

      requestedGame.subscribe((gameInfo) => {
        this.selectedGameService.setSelectedGame(gameInfo);
        this.selectedGameService.setImageGallery(gameInfo);
        this.forceScrollToTop();
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

  consoleAdapter(consoleData: string) {
    //console.log(consoleData);
    //MUST adapt values in the database to avoid doing this
    switch (consoleData) {
      case null:
        return 'PC';
      case '':
        return 'PC';
      case 'PS4':
        return 'PlayStation 4';
      case 'ps':
        return 'PlayStation';
      case 'psp':
        return 'PlayStation Portable';
      case 'ps2':
        return 'PlayStation 2';
      case 'ps3':
        return 'PlayStation 3';
      case 'Wii':
        return 'Nintendo Wii';
      case 'WiiU':
        return 'Nintendo Wii U';
      case 'SGenesis':
        return 'Sega Genesis';
      case 'Switch':
        return 'Nintendo Switch';
      case 'gba':
        return 'Nintendo Game Boy Advanced';
      default:
        return consoleData;
    }
  }

  toggleDescription() {
    this.showFullDescription.update((v) => !v);
  }

  scrollToSection() {
    if (this.relatedGamesCarousel) {
      this.relatedGamesCarousel.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  forceScrollToTop() {
    this.route.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      // this.updateImageGaleryAndActiveImage(this.selectedGame()); //FIX
    });
  }

  goToIssueSection() {
    if (this.issueSection) {
      this.issueSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  requirementsAdapter(requirementsData: string, requirementsType: string): string {
    // should be replaced if we can fix data in the data base
    let adaptedRequirements = requirementsData;

    const getSplitter = (): string => {
      let splitter: string = '';
      //console.log(requirementsData);
      if (requirementsData.includes('Recomendados')) splitter = 'Recomendados';
      if (requirementsData.includes('Recomendado')) splitter = 'Recomendado';
      if (requirementsData.includes('recomendados')) splitter = 'recomendados';
      if (requirementsData.includes('RECOMENDADO')) splitter = 'RECOMENDADO';
      if (requirementsData.includes('RECOMENDADOS')) splitter = 'RECOMENDADOS';
      if (requirementsData.includes('RECOMMENDED')) splitter = 'RECOMMENDED';

      return splitter;
    };

    if (requirementsData === null) return 'No hay requisitos para este juego aun';
    if (!getSplitter() && requirementsType == 'min') return requirementsData;
    if (requirementsType === 'min') {
      adaptedRequirements = requirementsData.split(getSplitter())[0];
    }
    if (requirementsType === 'rec') {
      adaptedRequirements = requirementsData.split(getSplitter())[1];
    }

    return adaptedRequirements;
  }
}

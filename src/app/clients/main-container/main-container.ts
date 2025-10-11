import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalStore } from '@app/store';
import { GameCard } from './components/game-card/game-card';
import { RouterLink } from '@angular/router';
import { MainNavBar } from '@app/shared/components/main-nav-bar/main-nav-bar';
import { SearchBar } from '@app/shared/components/search-bar/search-bar';
//import { CustomInputComponent } from '@app/shared/components/custom-input/custom-input';
import { GamesCarousel } from '@app/shared/components/carrousel/carrousel';

@Component({
  selector: 'app-main-container',
  imports: [GameCard, RouterLink, MainNavBar, SearchBar, GamesCarousel],
  templateUrl: './main-container.html',
  styleUrl: './main-container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContainer {
  readonly store = inject(GlobalStore);
  //console.log(store);
}

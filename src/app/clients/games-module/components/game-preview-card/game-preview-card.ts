import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { Game } from '@app/core/models';
import { SelectedGameService } from '@app/core/services/selected-game.service';
//import { GlobalStore } from '@app/store';
//import { JsonPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-preview',
  imports: [RouterLink],
  templateUrl: './game-preview-card.html',
  styleUrl: './game-preview-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCard implements OnInit {
  game = input.required<Game>();
  gameNameForUrl: string = 'tanjiro';
  private selectedGameService = inject(SelectedGameService);

  ngOnInit(): void {
    //improve this with a regular expresion
    let normalizedNameForUrl = this.game().name.toLowerCase();
    normalizedNameForUrl = normalizedNameForUrl.replace('-', '');
    normalizedNameForUrl = normalizedNameForUrl.replaceAll(' ', '-');
    normalizedNameForUrl = normalizedNameForUrl.replaceAll('--', '-');
    normalizedNameForUrl = normalizedNameForUrl.trim();

    this.gameNameForUrl = normalizedNameForUrl;
  }

  setSelectedGame() {
    this.selectedGameService.setSelectedGame(this.game());
  }

  // removeGame(gameId: string) {
  //   this.store.removeGame(gameId);
  // }
}

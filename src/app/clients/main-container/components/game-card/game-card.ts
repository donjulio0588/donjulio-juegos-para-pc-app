import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Game } from '@app/core/models';
import { GlobalStore } from '@app/store';
//import { JsonPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-card',
  //imports: [RouterLink],
  templateUrl: './game-card.html',
  styleUrl: './game-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCard {
  game = input.required<Game>();

  readonly store = inject(GlobalStore);

  removeGame(gameId: string) {
    this.store.removeGame(gameId);
  }
}

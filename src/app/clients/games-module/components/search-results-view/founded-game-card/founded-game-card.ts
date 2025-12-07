import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Inject, Input, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Game } from '@app/core/models/game.model';
import { SelectedGameService } from '@app/core/services/selected-game.service';



@Component({
  selector: 'app-founded-game-card',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './founded-game-card.html',
  styleUrl: './founded-game-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoundedGameCard {
  @Input() game: Game | null = null;
  private selectedGameService = inject(SelectedGameService);
  selectedProduct: Game | null = null;

  setSelectedGame() {
    this.selectedGameService.setSelectedGame(this.game as Game);
    this.selectedGameService.setImageGallery(this.game as Game);
  }

}

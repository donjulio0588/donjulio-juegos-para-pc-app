import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { Game } from '@app/core/models';
import { SelectedGameService } from '@app/core/services/selected-game.service';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-game-preview',
  imports: [RouterLink, UpperCasePipe],
  templateUrl: './game-preview-card.html',
  styleUrl: './game-preview-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCard implements OnInit {
  game = input.required<Game>();
  gameNameForUrl: string = 'tanjiro';
  private selectedGameService = inject(SelectedGameService);

  ngOnInit(): void {
    this.gameNameForUrl = this.game().friendly_url;
  }

  setSelectedGame() {
    this.selectedGameService.setSelectedGame(this.game());
    this.selectedGameService.setImageGallery(this.game());
  }

  // removeGame(gameId: string) {
  //   this.store.removeGame(gameId);
  // }
}

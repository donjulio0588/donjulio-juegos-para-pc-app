import { Injectable, signal } from '@angular/core';
import { Game } from '@app/core/models';

@Injectable({
  providedIn: 'root',
})
export class SelectedGameService {
  private selectedGame = signal<Game | null>(null);

  setSelectedGame(game: Game) {
    this.selectedGame.set(game);
    //save this game id in the local storage
  }

  getSelectedGame() {
    return this.selectedGame;
  }
}

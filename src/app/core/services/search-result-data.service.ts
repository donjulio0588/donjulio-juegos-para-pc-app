import { inject, Injectable, signal } from '@angular/core';
import { Game } from '../models/game.model';
import { HttpClient } from '@angular/common/http';

interface GameSearchData {
  gameName: string;
  mode: 'contains' | 'startsWith';
}

@Injectable({
  providedIn: 'root'
})
export class SearchResultData {
  private readonly baseUrl = 'http://localhost:4000/api/games'; //exportar a un archivo de configuracion
  searchResult = signal<Game[]>([]);
  http = inject(HttpClient);

  searchGames(gameSearchData: GameSearchData) {
    this.http.get<Game[]>(`${this.baseUrl}/search?gameName=${gameSearchData.gameName}&mode=${gameSearchData.mode ?? 'contains'}`).subscribe((games) => {
      this.setSearchResult(games);
    });
  }

  getSearchResult() {
    console.log(this.searchResult());
    return this.searchResult;
  }

  setSearchResult(games: Game[]) {
    this.searchResult.set(games);
  }
}

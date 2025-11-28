import { inject, Injectable, signal } from '@angular/core';
import { Game } from '../models/game.model';
import { HttpClient } from '@angular/common/http';
import { SearchResultAdapter } from '../adapters/game.adapter';
import { GameInfo } from '../models/game.model';

interface GameSearchData {
  gameName: string;
  mode: 'contains' | 'startsWith';
}

interface SearchResult {
  games: Game[];
}

@Injectable({
  providedIn: 'root'
})
export class SearchResultData {
  private readonly baseUrl = 'http://localhost:4000/api/games'; //exportar a un archivo de configuracion
  private searchResult = signal<SearchResult>({ games: [] });
  http = inject(HttpClient);

  searchGames(gameSearchData: GameSearchData) {
    this.http.get<SearchResult>(`${this.baseUrl}/search?gameName=${gameSearchData.gameName}&mode=${gameSearchData.mode ?? 'contains'}`).subscribe((games) => {
      this.setSearchResult(SearchResultAdapter(games as GameInfo));
    });
  }

  getSearchResult() {
    return this.searchResult;
  }

  setSearchResult(games: SearchResult) {
    this.searchResult.set(games);
  }
}

import { inject, Injectable, signal } from '@angular/core';
import { Game } from '../models/game.model';
import { HttpClient } from '@angular/common/http';
import { SearchResultAdapter } from '../adapters/game.adapter';
import { GameInfo } from '../models/game.model';
import { ActivatedRoute } from '@angular/router';

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
  private route = inject(ActivatedRoute);

  searchGames() {

    this.route.queryParams.subscribe((params) => {

      const generateQueryParams = () => {
        const queryParams: Array<string> = [];
        if (params['gameName']) queryParams.push(`gameName=${params['gameName']}`);
        if (params['mode']) queryParams.push(`mode=${params['mode']}`);
        if (params['startingPrice']) queryParams.push(`startingPrice=${params['startingPrice']}`);
        if (params['endingPrice']) queryParams.push(`endingPrice=${params['endingPrice']}`);
        if (params['orderBy']) queryParams.push(`orderBy=${params['orderBy']}`);
        if (params['startingSize']) queryParams.push(`startingSize=${params['startingSize']}`);
        if (params['endingSize']) queryParams.push(`endingSize=${params['endingSize']}`);
        if (params['language']) queryParams.push(`language=${params['language']}`);
        if (params['multiplayer']) queryParams.push(`multiplayer=${params['multiplayer']}`);
        return queryParams;
      };

      // console.log(generateQueryParams());
      if (params['gameName']) {
        this.http.get<SearchResult>(`${this.baseUrl}/search?${generateQueryParams().join('&')}`).subscribe((games) => {
          this.setSearchResult(SearchResultAdapter(games as GameInfo));
        });
      }
    })


  }

  getSearchResult() {
    return this.searchResult;
  }

  setSearchResult(games: SearchResult) {
    this.searchResult.set(games);
  }
}

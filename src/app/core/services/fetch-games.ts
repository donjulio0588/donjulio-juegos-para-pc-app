import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Game, GameInfo } from '../models';
import { GameAdapter } from '../adapters/game.adapter';

@Injectable({
  providedIn: 'root',
})
export class FetchGames {
  private readonly baseUrl = 'http://localhost:4000/api/games';
  http = inject(HttpClient);

  getAllGames(pageSize: number, pageNumber: number): Observable<GameInfo> {
    const pageNumberSubstringForURL = pageNumber ? `/page/${pageNumber}` : '';

    return this.http
      .get<GameInfo>(`${this.baseUrl}${pageNumberSubstringForURL}?limit=${pageSize}`)
      .pipe(map((game) => GameAdapter(game)));
  }

  addGame(game: Omit<Game, 'id'>): Observable<void> {
    return this.http.post<void>(this.baseUrl, { game }).pipe(
      catchError(() => {
        console.info('error prevented for testing');
        return Promise.resolve();
      })
    );
  }

  updateGame(game: Game): Observable<void> {
    const url = `${this.baseUrl}/${game.id}`;
    return this.http.put<void>(url, { game }).pipe(
      catchError(() => {
        console.info('error prevented for testing');
        return Promise.resolve();
      })
    );
  }

  removeGame(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(() => {
        console.info('error prevented for testing');
        return Promise.resolve();
      })
    );
  }
}

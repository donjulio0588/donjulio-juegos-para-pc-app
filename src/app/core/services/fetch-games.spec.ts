import { TestBed } from '@angular/core/testing';

import { FetchGames } from './fetch-games';

describe('FetchGames', () => {
  let service: FetchGames;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchGames);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

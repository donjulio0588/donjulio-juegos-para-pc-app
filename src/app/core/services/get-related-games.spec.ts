import { TestBed } from '@angular/core/testing';

import { GetRelatedGames } from './get-related-games';

describe('GetRelatedGames', () => {
  let service: GetRelatedGames;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetRelatedGames);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

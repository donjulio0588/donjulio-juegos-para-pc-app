import { TestBed } from '@angular/core/testing';

import { DataForUrl } from './data-for-url';

describe('DataForUrl', () => {
  let service: DataForUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataForUrl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

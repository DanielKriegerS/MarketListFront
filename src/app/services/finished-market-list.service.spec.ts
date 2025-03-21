import { TestBed } from '@angular/core/testing';

import { FinishedMarketListService } from './finished-market-list.service';

describe('FinishedMarketListService', () => {
  let service: FinishedMarketListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinishedMarketListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

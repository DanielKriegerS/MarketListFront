import { TestBed } from '@angular/core/testing';

import { MarketListService } from './market-list.service';

describe('MarketListService', () => {
  let service: MarketListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MarketSquareService } from './market-square.service';

describe('MarketSquareService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarketSquareService]
    });
  });

  it('should ...', inject([MarketSquareService], (service: MarketSquareService) => {
    expect(service).toBeTruthy();
  }));
});

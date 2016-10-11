/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { MarketSquareService } from './market-square.service';

describe('MarketSquare Service', () => {
  beforeEach(() => {
    addProviders([MarketSquareService]);
  });

  it('should ...',
    inject([MarketSquareService],
      (service: MarketSquareService) => {
        expect(service).toBeTruthy();
      }));
});

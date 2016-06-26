/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { MarketSquareService } from './market-square.service';

describe('MarketSquare Service', () => {
  beforeEachProviders(() => [MarketSquareService]);

  it('should ...',
      inject([MarketSquareService], (service: MarketSquareService) => {
    expect(service).toBeTruthy();
  }));
});

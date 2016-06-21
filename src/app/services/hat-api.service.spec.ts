/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { HatApiService } from './hat-api.service';

describe('HatApi Service', () => {
  beforeEachProviders(() => [HatApiService]);

  it('should ...',
      inject([HatApiService], (service: HatApiService) => {
    expect(service).toBeTruthy();
  }));
});

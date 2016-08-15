/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { RumpelService } from './rumpel.service';

describe('Rumpel Service', () => {
  beforeEachProviders(() => [RumpelService]);

  it('should ...',
      inject([RumpelService], (service: RumpelService) => {
    expect(service).toBeTruthy();
  }));
});

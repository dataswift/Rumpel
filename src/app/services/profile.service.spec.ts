/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { ProfileService } from './profile.service';

describe('Profile Service', () => {
  beforeEachProviders(() => [ProfileService]);

  it('should ...',
      inject([ProfileService], (service: ProfileService) => {
    expect(service).toBeTruthy();
  }));
});

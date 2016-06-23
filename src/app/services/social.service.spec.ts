/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { SocialService } from './social.service';

describe('Social Service', () => {
  beforeEachProviders(() => [SocialService]);

  it('should ...',
      inject([SocialService], (service: SocialService) => {
    expect(service).toBeTruthy();
  }));
});

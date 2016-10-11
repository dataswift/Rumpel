/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { SocialService } from './social.service';

describe('Social Service', () => {
  beforeEach(() => {
    addProviders([SocialService]);
  });

  it('should ...',
    inject([SocialService],
      (service: SocialService) => {
        expect(service).toBeTruthy();
      }));
});

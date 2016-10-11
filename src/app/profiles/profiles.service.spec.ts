/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { ProfilesService } from './profiles.service';

describe('Profile Service', () => {
  beforeEach(() => {
    addProviders([ProfilesService]);
  });

  it('should ...',
    inject([ProfilesService],
      (service: ProfilesService) => {
        expect(service).toBeTruthy();
      }));
});

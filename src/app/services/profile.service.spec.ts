/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { ProfileService } from './profile.service';

describe('Profile Service', () => {
  beforeEach(() => {
    addProviders([ProfileService]);
  });

  it('should ...',
    inject([ProfileService],
      (service: ProfileService) => {
        expect(service).toBeTruthy();
      }));
});

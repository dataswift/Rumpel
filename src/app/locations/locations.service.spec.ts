/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { LocationsService } from './locations.service';

describe('Locations Service', () => {
  beforeEach(() => {
    addProviders([LocationsService]);
  });

  it('should ...',
    inject([LocationsService],
      (service: LocationsService) => {
        expect(service).toBeTruthy();
      }));
});

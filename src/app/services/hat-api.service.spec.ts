/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { HatApiService } from './hat-api.service';

describe('HatApi Service', () => {
  beforeEach(() => {
    addProviders([HatApiService]);
  });

  it('should ...',
    inject([HatApiService],
      (service: HatApiService) => {
        expect(service).toBeTruthy();
      }));
});

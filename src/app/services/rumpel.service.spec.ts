/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { RumpelService } from './rumpel.service';

describe('Rumpel Service', () => {
  beforeEach(() => {
    addProviders([RumpelService]);
  });

  it('should ...',
    inject([RumpelService],
      (service: RumpelService) => {
        expect(service).toBeTruthy();
      }));
});

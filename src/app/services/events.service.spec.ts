/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { EventsService } from './events.service';

describe('Events Service', () => {
  beforeEach(() => {
    addProviders([EventsService]);
  });

  it('should ...',
    inject([EventsService],
      (service: EventsService) => {
        expect(service).toBeTruthy();
      }));
});

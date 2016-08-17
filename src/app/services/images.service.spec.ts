/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { ImagesService } from './images.service';

describe('Photos Service', () => {
  beforeEach(() => {
    addProviders([ImagesService]);
  });

  it('should ...',
    inject([ImagesService],
      (service: ImagesService) => {
        expect(service).toBeTruthy();
      }));
});

/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { PhotosService } from './photos.service';

describe('Photos Service', () => {
  beforeEach(() => {
    addProviders([PhotosService]);
  });

  it('should ...',
    inject([PhotosService],
      (service: PhotosService) => {
        expect(service).toBeTruthy();
      }));
});

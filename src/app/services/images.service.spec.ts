import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { ImagesService } from './images.service';

describe('Photos Service', () => {
  beforeEachProviders(() => [ImagesService]);

  it('should ...',
      inject([ImagesService], (service: ImagesService) => {
    expect(service).toBeTruthy();
  }));
});

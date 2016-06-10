import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { LocationsService } from './locations.service';

describe('Locations Service', () => {
  beforeEachProviders(() => [LocationsService]);

  it('should ...',
      inject([LocationsService], (service: LocationsService) => {
    expect(service).toBeTruthy();
  }));
});

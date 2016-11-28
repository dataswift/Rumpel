/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocationsService } from './locations.service';

describe('LocationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationsService]
    });
  });

  it('should ...', inject([LocationsService], (service: LocationsService) => {
    expect(service).toBeTruthy();
  }));
});

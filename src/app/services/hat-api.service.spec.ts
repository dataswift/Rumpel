/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HatApiService } from './hat-api.service';

describe('HatApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HatApiService]
    });
  });

  it('should ...', inject([HatApiService], (service: HatApiService) => {
    expect(service).toBeTruthy();
  }));
});

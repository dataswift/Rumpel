import { TestBed, inject } from '@angular/core/testing';

import { StaticDataService } from './static-data.service';
import {HatApiService} from '../core/services/hat-api.service';

describe('StaticDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StaticDataService,
        { provide: HatApiService, useValue: {} }
      ]
    });
  });

  it('should be created', inject([StaticDataService], (service: StaticDataService) => {
    expect(service).toBeTruthy();
  }));
});

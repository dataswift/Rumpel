import { TestBed, inject } from '@angular/core/testing';

import { HatClaimService } from './hat-claim.service';
import { HatApiService } from '../core/services/hat-api.service';

describe('HatClaimService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HatClaimService,
        { provide: HatApiService, useValue: {} }
      ]
    });
  });

  it('should be created', inject([HatClaimService], (service: HatClaimService) => {
    expect(service).toBeTruthy();
  }));
});

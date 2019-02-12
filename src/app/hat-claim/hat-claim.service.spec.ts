import { TestBed, inject } from '@angular/core/testing';

import { HatClaimService } from './hat-claim.service';

describe('HatClaimService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HatClaimService]
    });
  });

  it('should be created', inject([HatClaimService], (service: HatClaimService) => {
    expect(service).toBeTruthy();
  }));
});

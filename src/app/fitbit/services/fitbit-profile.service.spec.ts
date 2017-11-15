import { TestBed, inject } from '@angular/core/testing';

import { FitbitProfileService } from './fitbit-profile.service';

describe('FitbitProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FitbitProfileService]
    });
  });

  it('should be created', inject([FitbitProfileService], (service: FitbitProfileService) => {
    expect(service).toBeTruthy();
  }));
});

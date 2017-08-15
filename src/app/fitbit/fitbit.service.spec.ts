import { TestBed, inject } from '@angular/core/testing';

import { FitbitService } from './fitbit.service';

describe('FitbitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FitbitService]
    });
  });

  it('should be created', inject([FitbitService], (service: FitbitService) => {
    expect(service).toBeTruthy();
  }));
});

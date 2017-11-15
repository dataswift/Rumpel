import { TestBed, inject } from '@angular/core/testing';

import { FitbitActivityService } from './fitbit-activity.service';

describe('FitbitActivityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FitbitActivityService]
    });
  });

  it('should be created', inject([FitbitActivityService], (service: FitbitActivityService) => {
    expect(service).toBeTruthy();
  }));
});

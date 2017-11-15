import { TestBed, inject } from '@angular/core/testing';

import { FitbitActivitySummaryService } from './fitbit-activity-summary.service';

describe('FitbitActivitySummaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FitbitActivitySummaryService]
    });
  });

  it('should be created', inject([FitbitActivitySummaryService], (service: FitbitActivitySummaryService) => {
    expect(service).toBeTruthy();
  }));
});

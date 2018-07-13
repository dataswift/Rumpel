import { TestBed, inject } from '@angular/core/testing';

import { FitbitActivitySummaryService } from './fitbit-activity-summary.service';
import { HatApiService } from '../../core/services/hat-api.service';
import { AuthService } from '../../core/services/auth.service';
import { of } from 'rxjs';

describe('FitbitActivitySummaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FitbitActivitySummaryService,
        { provide: HatApiService, useValue: {} },
        { provide: AuthService, useValue: { auth$: of(false)} }]
    });
  });

  it('should be created', inject([FitbitActivitySummaryService], (service: FitbitActivitySummaryService) => {
    expect(service).toBeTruthy();
  }));
});

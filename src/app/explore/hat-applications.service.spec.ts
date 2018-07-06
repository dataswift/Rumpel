import { TestBed, inject } from '@angular/core/testing';

import { HatApplicationsService } from './hat-applications.service';
import { HatApiService } from '../core/services/hat-api.service';
import { AuthService } from '../core/services/auth.service';
import { of } from 'rxjs';

describe('HatApplicationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HatApplicationsService,
        { provide: HatApiService, useValue: {
          getApplicationList: () => of([]),
          getApplicationById: (app: string) => of({}),
          getSheRecords: (app: string) => of([])
        } },
        { provide: AuthService, useValue: { user$: of({ fullDomain: 'test.hat.net' }) } }
      ]
    });
  });

  it('should be created', inject([HatApplicationsService], (service: HatApplicationsService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { HatApplicationsService } from './hat-applications.service';
import { HatApiService } from '../core/services/hat-api.service';
import { AuthService } from '../core/services/auth.service';
import { Observable } from 'rxjs/Observable';

describe('HatApplicationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HatApplicationsService,
        { provide: HatApiService, useValue: {
          getApplicationList: () => Observable.of([]),
          getApplicationById: (app: string) => Observable.of({}),
          getSheRecords: (app: string) => Observable.of([])
        } },
        { provide: AuthService, useValue: { user$: Observable.of({ fullDomain: 'test.hat.net' }) } }
      ]
    });
  });

  it('should be created', inject([HatApplicationsService], (service: HatApplicationsService) => {
    expect(service).toBeTruthy();
  }));
});

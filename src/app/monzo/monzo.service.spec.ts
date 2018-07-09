import { TestBed, inject } from '@angular/core/testing';

import { MonzoService } from './monzo.service';
import { HatApiService } from '../core/services/hat-api.service';
import { AuthService } from '../core/services/auth.service';
import { of } from 'rxjs';

describe('MonzoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MonzoService,
        { provide: HatApiService, useValue: {} },
        { provide: AuthService, useValue: { auth$: of(false)} }
      ]
    });
  });

  it('should be created', inject([MonzoService], (service: MonzoService) => {
    expect(service).toBeTruthy();
  }));
});

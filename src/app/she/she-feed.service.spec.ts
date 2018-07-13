import { TestBed, inject } from '@angular/core/testing';

import { SheFeedService } from './she-feed.service';
import { AuthService } from '../core/services/auth.service';
import { HatApiService } from '../core/services/hat-api.service';
import { of } from 'rxjs';

describe('SheFeedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SheFeedService,
        { provide: AuthService, useValue: { auth$: of({}) } },
        { provide: HatApiService, useValue: {} }
      ]
    });
  });

  it('should be created', inject([SheFeedService], (service: SheFeedService) => {
    expect(service).toBeTruthy();
  }));
});

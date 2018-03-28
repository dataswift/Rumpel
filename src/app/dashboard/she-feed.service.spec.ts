import { TestBed, inject } from '@angular/core/testing';

import { SheFeedService } from './she-feed.service';
import { AuthService } from '../core/services/auth.service';
import { HatApiService } from '../core/services/hat-api.service';
import { Observable } from 'rxjs/Observable';

describe('SheFeedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SheFeedService,
        { provide: AuthService, useValue: { auth$: Observable.of({}) } },
        { provide: HatApiService, useValue: {} }
      ]
    });
  });

  it('should be created', inject([SheFeedService], (service: SheFeedService) => {
    expect(service).toBeTruthy();
  }));
});

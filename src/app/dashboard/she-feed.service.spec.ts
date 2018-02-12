import { TestBed, inject } from '@angular/core/testing';

import { SheFeedService } from './she-feed.service';
import { UserService } from '../user/user.service';
import { HatApiV2Service } from '../services/hat-api-v2.service';
import { Observable } from 'rxjs/Observable';

describe('SheFeedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SheFeedService,
        { provide: UserService, useValue: { auth$: Observable.of({}) } },
        { provide: HatApiV2Service, useValue: {} }
      ]
    });
  });

  it('should be created', inject([SheFeedService], (service: SheFeedService) => {
    expect(service).toBeTruthy();
  }));
});

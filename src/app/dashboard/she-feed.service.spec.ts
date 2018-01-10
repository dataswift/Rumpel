import { TestBed, inject } from '@angular/core/testing';

import { SheFeedService } from './she-feed.service';

describe('SheFeedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SheFeedService]
    });
  });

  it('should be created', inject([SheFeedService], (service: SheFeedService) => {
    expect(service).toBeTruthy();
  }));
});

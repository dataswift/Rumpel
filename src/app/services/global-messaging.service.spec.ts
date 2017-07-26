import { TestBed, inject } from '@angular/core/testing';

import { GlobalMessagingService } from './global-messaging.service';

describe('GlobalMessagingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalMessagingService]
    });
  });

  it('should be created', inject([GlobalMessagingService], (service: GlobalMessagingService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { HatApplicationsService } from './hat-applications.service';

describe('HatApplicationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HatApplicationsService]
    });
  });

  it('should be created', inject([HatApplicationsService], (service: HatApplicationsService) => {
    expect(service).toBeTruthy();
  }));
});

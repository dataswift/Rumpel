import { TestBed, inject } from '@angular/core/testing';

import { MonzoService } from './monzo.service';

describe('MonzoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonzoService]
    });
  });

  it('should be created', inject([MonzoService], (service: MonzoService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { DataOfferService } from './data-offer.service';

describe('DataOfferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataOfferService]
    });
  });

  it('should be created', inject([DataOfferService], (service: DataOfferService) => {
    expect(service).toBeTruthy();
  }));
});

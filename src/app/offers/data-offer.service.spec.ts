import { TestBed, inject } from '@angular/core/testing';

import { DataOfferService } from './data-offer.service';
import { APP_CONFIG } from '../app.config';
import { HatApiService } from '../core/services/hat-api.service';
import { HttpBackendClient } from '../core/services/http-backend-client.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DataOfferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        DataOfferService,
        HttpBackendClient,
        { provide: APP_CONFIG, useValue: { } },
        { provide: HatApiService, useValue: { proxiedRequest: (app: string) => null } },
      ]
    });
  });

  it('should be created', inject([DataOfferService], (service: DataOfferService) => {
    expect(service).toBeTruthy();
  }));
});

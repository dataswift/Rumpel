import { TestBed, inject } from '@angular/core/testing';

import { DexApiService } from './dex-api.service';
import { APP_CONFIG } from '../app.config';
import { HatApiService } from '../core/services/hat-api.service';
import { HttpBackendClient } from '../core/services/http-backend-client.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DexApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        DexApiService,
        HttpBackendClient,
        { provide: APP_CONFIG, useValue: { dex: { url: 'test.url', pathPrefix: '/api' } } },
        { provide: HatApiService, useValue: {} },
      ]
    });
  });

  it('should be created', inject([DexApiService], (service: DexApiService) => {
    expect(service).toBeTruthy();
  }));
});

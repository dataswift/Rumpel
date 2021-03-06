import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HatApiService } from './hat-api.service';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { APP_CONFIG } from '../../app.config';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpBackendClient } from './http-backend-client.service';
import { CacheService } from './cache.service';
import { CookieService } from 'ngx-cookie-service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        HatApiService,
        BrowserStorageService,
        HttpBackendClient,
        CookieService,
        { provide: CacheService, useValue: { } },
        { provide: APP_CONFIG, useValue: { name: '' } }
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});

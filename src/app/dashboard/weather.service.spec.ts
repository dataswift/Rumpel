import { TestBed, inject } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import { HttpBackendClient } from '../core/services/http-backend-client.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Weather Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ WeatherService, HttpBackendClient ]
    });
  });

  it('should be created', inject([WeatherService], (service: WeatherService) => {
    expect(service).toBeTruthy();
  }));
});

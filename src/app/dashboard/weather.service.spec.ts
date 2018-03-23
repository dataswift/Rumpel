import { TestBed, inject } from '@angular/core/testing';

import { WeatherService } from './weather.service';

describe('Weather Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherService]
    });
  });

  it('should be created', inject([WeatherService], (service: WeatherService) => {
    expect(service).toBeTruthy();
  }));
});

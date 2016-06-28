/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { WeatherService } from './weather.service';

describe('Weather Service', () => {
  beforeEachProviders(() => [WeatherService]);

  it('should ...',
    inject([WeatherService], (service: WeatherService) => {
    expect(service).toBeTruthy();
  }));
});

/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TileWeatherComponent } from './tile-weather.component';
import { WeatherService } from '../weather.service';
import { Observable } from "rxjs";

class MockWeatherService {
  getCurrentWeather() {
    return Observable.of({
      "display_location": {
        "full": "San Francisco, CA",
        "city": "San Francisco",
        "state": "CA",
        "state_name": "California",
        "country": "US",
        "country_iso3166": "US",
        "zip": "94102",
        "magic": "1",
        "wmo": "99999",
        "latitude": "37.77999878",
        "longitude": "-122.41999817",
        "elevation": "60.0"
      }
    });
  }
}

describe('TileWeatherComponent', () => {
  let component: TileWeatherComponent;
  let fixture: ComponentFixture<TileWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileWeatherComponent ],
      providers: [{ provide: WeatherService, useClass: MockWeatherService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 2016
 */

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TileWeatherComponent } from './tile-weather.component';
import { WeatherService } from '../weather.service';
import { of } from 'rxjs';

class MockWeatherService {
  getCurrentWeather() {
    return of({
      weather: 'haze',
      display_location: { full: 'London, UK' },
      temp_c: '32 C',
      feelslike_c: '29 C',
      observation_epoch: 1234567890
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

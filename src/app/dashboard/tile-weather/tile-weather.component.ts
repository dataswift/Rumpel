/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { unix } from 'moment/moment';

@Component({
  selector: 'rum-tile-weather',
  templateUrl: 'tile-weather.component.html',
  styleUrls: ['tile-weather.component.scss']
})
export class TileWeatherComponent implements OnInit {
  public icon: string;
  public temp: string;
  public city: string;
  public description: string;
  public feelsLike: string;
  public lastUpdated: any;

  constructor(private weatherSvc: WeatherService) {}

  ngOnInit() {
    this.weatherSvc.getCurrentWeather('UK', 'London').subscribe(
      currentw => {
        this.icon = currentw.weather.replace(new RegExp(' ', 'g'), '').toLowerCase();
        if (this.icon === 'haze' || this.icon === 'clear') {
          this.icon = 'cloud';
        }
        this.city = currentw.display_location.full;
        this.temp = currentw.temp_c;
        this.description = currentw.weather;
        this.feelsLike = currentw.feelslike_c;
        this.lastUpdated = unix(currentw.observation_epoch).fromNow();
      },
      err => console.log('Weather data could not be retrieved', err));
  }

}

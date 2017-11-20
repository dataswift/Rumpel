/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WeatherService {
  private baseUrl: string;
  private token: string;

  constructor(private http: Http) {
    this.baseUrl = 'https://api.wunderground.com/api';
    this.token = '648b0984a45bdea3';
  }

  getCurrentWeather(country: string, city: string): Observable<any> {
    const url = `${this.baseUrl}/${this.token}/conditions/q/autoip.json`;

    return this.http.get(url)
      .map(res => res.json())
      .map(wunder => wunder.current_observation);
  }
}

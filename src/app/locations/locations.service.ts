/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Injectable } from '@angular/core';

import { BaseDataService } from '../services/base-data.service';
import { AuthService } from '../core/services/auth.service';
import { HatApiService } from '../core/services/hat-api.service';

import { HatRecord } from '../shared/interfaces/hat-record.interface';
import { LocationIos } from '../shared/interfaces/location.interface';

declare var L: any;

@Injectable()
export class LocationsService extends BaseDataService<LocationIos> {
  public map: any;
  public baseMaps: any;

  constructor(hatSvc: HatApiService, authSvc: AuthService) {
    super(hatSvc, authSvc, 'rumpel', 'locations/ios', 'dateCreated');

    this.baseMaps = {
      OpenStreetMap: new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: `Map data &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors,` +
                     `<a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>`
      })
    };
  }

  getCurrentDeviceLocation(callback) {
    navigator.geolocation.getCurrentPosition(
      location => {
        const here = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          accuracy: location.coords.accuracy
        };

        return callback(null, here);
      },
      err => {
        return callback(err);
      });
  }

  coerceType(rawLocation: HatRecord<any>): HatRecord<LocationIos> {
    return {
      endpoint: rawLocation.endpoint,
      recordId: rawLocation.recordId,
      data: <LocationIos>rawLocation.data
    };
  }
}

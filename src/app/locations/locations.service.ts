/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Injectable } from '@angular/core';

import { HatApiService } from '../services/hat-api.service';
import { Location } from '../shared/interfaces';

import * as moment from 'moment';
import {BaseDataService} from '../services/base-data.service';
import {UiStateService} from '../services/ui-state.service';
import {HatApiV2Service} from '../services/hat-api-v2.service';
import {HatRecord} from '../shared/interfaces/hat-record.interface';

declare var L: any;

@Injectable()
export class LocationsService extends BaseDataService<Location> {
  public map: any;
  public baseMaps: any;

  constructor(hatSvc: HatApiV2Service, uiSvc: UiStateService) {
    super(hatSvc, uiSvc, 'iphone', 'locations', 'timestamp');

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
        const here: Location = {
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

  coerceType(rawLocation: HatRecord<any>): HatRecord<Location> {
    const locContent = rawLocation.data;

    return {
      endpoint: rawLocation.endpoint,
      recordId: rawLocation.recordId,
      data: {
        id: locContent.timestamp,
        latitude: locContent.latitude,
        longitude: locContent.longitude,
        accuracy: null,
        timestamp: moment(locContent.timestamp)
      }
    };
  }
}

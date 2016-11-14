import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';

import { HatApiService } from '../services/hat-api.service';
import { Location } from '../shared/interfaces';

import * as moment from 'moment';

declare var L: any;

@Injectable()
export class LocationsService {
  private _locations$: Subject<Location[]>;
  public locations$: Observable<Location[]>;

  public map: any;
  public baseMaps: any;

  private store: {
    locations: Array<Location>;
    tableId: number;
  };
  private tableVerified: boolean;
  private failedAttempts: number;
  private oldestRecordTimestamp: string;

  constructor(private hat: HatApiService) {
    this.baseMaps = {
      OpenStreetMap: new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
      })
    };
    this.store = {
      locations: [],
      tableId: null
    };
    this.tableVerified = false;
    this.failedAttempts = 0;
    this.oldestRecordTimestamp = null;

    this._locations$ = <Subject<Location[]>>new Subject();
    this.locations$ = this._locations$.asObservable();

    this.verifyTable();
  }

  getRecentLocations() {
    if (this.store.locations.length > 0) {
      this.pushToStream();
    } else if (this.store.tableId) {
      this.hat.getValuesWithLimit(this.store.tableId, 500)
          .map(locations => {
            if (locations.length > 0) {
              this.oldestRecordTimestamp = moment(locations[locations.length - 1].lastUpdated).format("X");
            }
            return locations.map(this.locMap);
          })
          .map((locations: Array<Location>) => locations.sort((a, b) => a.timestamp.isAfter(b.timestamp) ? -1 : 1))
          .subscribe(locations => {
            this.store.locations = locations;

            this.pushToStream();
            if (locations.length > 0) {
              this.getMoreLocations();
            }
          })
    } else if (this.failedAttempts <= 10) {
      this.failedAttempts++;
      return Observable.timer(75).subscribe(() => this.getRecentLocations());
    }
  }

  getMoreLocations() {
    if (this.oldestRecordTimestamp) {
      this.hat.getValuesWithLimit(this.store.tableId, 500, this.oldestRecordTimestamp)
          .map(locations => {
            if (locations.length > 0) {
              this.oldestRecordTimestamp = moment(locations[locations.length - 1].lastUpdated).format("X");
            }
            return locations.map(this.locMap);
          })
          .map((locations: Array<Location>) => locations.sort((a, b) => a.timestamp.isAfter(b.timestamp) ? -1 : 1))
          .subscribe(locations => {
            this.store.locations = this.store.locations.concat(locations);

            this.pushToStream();

            if (this.store.locations.length < 5000 && locations.length > 0) {
              this.getMoreLocations();
            }
          })
    }
  }

  getCurrentDeviceLocation(callback) {
    navigator.geolocation.getCurrentPosition(
      location => {
        let here: Location = {
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

  private pushToStream() {
    return this._locations$.next(this.store.locations);
  }

  private verifyTable() {
    this.hat.getTable('locations', 'iphone')
        .subscribe(table => {
          if (table === "Not Found") {
            this.tableVerified = false;
          } else if (table.id) {
            this.store.tableId = table.id;
            this.tableVerified = true;
          }
        });
  }

  private locMap(location: any): Location {
    return {
      latitude: location.data.locations.latitude,
      longitude: location.data.locations.longitude,
      accuracy: null,
      timestamp: moment(location.data.locations.timestamp)
    };
  }
}

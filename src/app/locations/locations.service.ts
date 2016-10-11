import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';

import { HatApiService } from '../services/hat-api.service';
import { DataPoint } from '../shared/data-point.interface';
import { Location } from '../shared/interfaces/location.interface';

import * as moment from 'moment';

@Injectable()
export class LocationsService {
  private _locations$: Subject<DataPoint[]>;
  public locations$: Observable<DataPoint[]>;

  private store: {
    locations: Array<DataPoint>;
    tableId: number;
  };
  private tableVerified: boolean;
  private failedAttempts: number;
  private oldestRecordTimestamp: string;

  constructor(private hat: HatApiService) {
    this.store = {
      locations: [],
      tableId: null
    };
    this.tableVerified = false;
    this.failedAttempts = 0;
    this.oldestRecordTimestamp = null;

    this._locations$ = <Subject<DataPoint[]>>new Subject();
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
              this.oldestRecordTimestamp = moment(locations[locations.length - 1].dateCreated).format("X");
            }
            return locations.map(this.locMap);
          })
          .map(locations => locations.sort((a, b) => a.timestamp.isAfter(b.timestamp) ? -1 : 1))
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
              this.oldestRecordTimestamp = moment(locations[locations.length - 1].dateCreated).format("X");
            }
            return locations.map(this.locMap);
          })
          .map(locations => locations.sort((a, b) => a.timestamp.isAfter(b.timestamp) ? -1 : 1))
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

  private locMap(location: any): DataPoint {
    return {
      timestamp: moment(location.data.locations.timestamp),
      type: 'location',
      source: 'iphone',
      location: {
        latitude: location.data.locations.latitude,
        longitude: location.data.locations.longitude,
        accuracy: null
      }
    };
  }
}

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';

import { HatApiService } from './hat-api.service';
import { DataPoint } from '../shared';
import { Location } from '../shared/interfaces';
import * as moment from 'moment';

@Injectable()
export class LocationsService {
  private locations$: Subject<DataPoint[]>;
  private store: { locations: Array<DataPoint> };
  private timeSpan: number;
  private decrementInterval: number;
  private failedAttempts: number;

  constructor(private hat: HatApiService) {
    this.store = { locations: [] };
    this.locations$ = <Subject<DataPoint[]>>new Subject();
    this.timeSpan = 6;
    this.decrementInterval = 0.5;
    this.failedAttempts = 0;
  }

  getLocations$() {
    return this.locations$.asObservable();
  }

  showAll() {
    if (this.store.locations.length > 0) {
      console.log('Inside locations if');
      this.locations$.next(this.store.locations);
    }

    this.loadAll().subscribe(
      data => {
        if (data.length === 0) {
          setTimeout(() => {
            this.failedAttempts++;
            if (this.failedAttempts < 20) {
              this.timeSpan += 6;
              return this.showAll();
            }
          }, 50);
          return;
        }
        this.store.locations = data;
        this.locations$.next(this.store.locations);
      },
      err => {
        console.log(`Locations table could not be found`);
        this.timeSpan -= this.decrementInterval;
        this.showAll();
      }
    );
  }

  loadAll(): Observable<DataPoint[]> {
    return this.loadFrom('iphone')
      .map(locations => locations.map(this.locMap))
      .map(locations => locations.sort((a, b) => a.timestamp.isAfter(b.timestamp) ? -1 : 1));;
  }

  getCurrentDeviceLocation(callback) {
    navigator.geolocation.getCurrentPosition(location => {
      let here: Location = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy
      };

      return callback(here);
    });
  }

  private loadFrom(source: string): Observable<any> {
    let startTime = moment().subtract(this.timeSpan, 'hours').format('X');

    return this.hat.getAllValuesOf('locations', source, startTime);
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

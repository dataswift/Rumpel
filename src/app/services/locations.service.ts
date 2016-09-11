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

  constructor(private hat: HatApiService) {
    this.store = { locations: [] };
    this.locations$ = <Subject<DataPoint[]>>new Subject();
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
        this.store.locations = data;
        this.locations$.next(this.store.locations);
      },
      err => console.log(`Locations table could not be found`)
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
    let startTime = moment().subtract(7, 'days').format('X');

    return this.hat.getAllValuesOf('locations', source, startTime);
  }

  private locMap(location: any): DataPoint {
    return {
      timestamp: moment(location.timestamp),
      type: 'location',
      source: 'iphone',
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
        accuracy: null
      }
    };
  }
}

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';

import { HatApiService } from './hat-api.service';
import { DataPoint } from '../shared';
import * as moment from 'moment';

@Injectable()
export class LocationsService {
  private locations$: Subject<DataPoint[]>;
  private store: { locations: Array<DataPoint> };

  constructor(private hat: HatApiService) {
    this.store = { locations: [] };
    this.locations$ = <Subject<DataPoint[]>>new Subject();
  }

  showAll(): Observable<DataPoint[]> {
    if (this.store.locations.length > 0) {
      console.log('Inside locations if');
      return Observable.of(this.store.locations);
    }

    this.loadAll().subscribe(
      data => {
        this.store.locations = data;
        console.log(data);
        this.locations$.next(this.store.locations);
      },
      err => console.log(`Locations table could not be found`)
    );
    return this.locations$.asObservable();
  }

  loadAll(): Observable<DataPoint[]> {
    return this.loadFrom('iphone').map(locations => locations.map(this.locMap));
  }

  loadFrom(source: string): Observable<any> {
    return this.hat.getAllValuesOf('locations', source);
  }

  locMap(location: any): DataPoint {
    return {
      timestamp: moment(parseInt(location.start)),
      type: 'location',
      source: 'iphone',
      location: {
        latitude: location.latitude,
        longitude: location.longitude
      }
    };
  }
}

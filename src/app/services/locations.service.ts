import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import { Location } from '../shared/index';

@Injectable()
export class LocationsService {
  locations$: Observable<any>;
  private _locationsObserver: Observer<any>;
  private _store: { locations: Array<Location> };

  constructor(private _http: Http) {
    this._store = { locations: [] };
    this.locations$ = new Observable(observer => this._locationsObserver = observer).share();
  }

  loadAll() {
    this._http.get('/mock-data/locations.json').map(res => res.json().locations)
      .map((data: Array<any>) => {
        const newLocations: Array<Location> = data.map((location) => {
          return {
            latitude: location.latitudeE7 / 10000000,
            longitude: location.longitudeE7 / 10000,
            accuracy: null,
            timestamp: new Date(parseInt(location.timestampMs))
          }
        });
        return newLocations;
      })
      .subscribe(data => {
        this._store.locations = data;
        this._locationsObserver.next(this._store.locations);
      }, err => console.log('There was an error loading locations from HAT', err));
  }
}

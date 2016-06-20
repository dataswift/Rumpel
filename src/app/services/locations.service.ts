import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import { Location } from '../shared/index';
import { EventsService } from './events.service';
import { ImagesService } from './images.service';
import * as moment from 'moment';

@Injectable()
export class LocationsService {
  locations$: Observable<any>;
  private _locationsObserver: Observer<any>;
  private _dataLoaded: boolean;
  private _store: { locations: Array<Location>; images: Array<Location>; events: Array<Location>; };

  constructor(private _http: Http,
              private _eventsSvc: EventsService,
              private _imagesSvc: ImagesService) {

    this._dataLoaded = false;
    this._store = { locations: [], images: [], events: [] };
    this.locations$ = new Observable(observer => this._locationsObserver = observer).share();

    this._imagesSvc.images$.subscribe(data => {
      const locationEnabledData = data.reduce((acc, datap) => {
        if (datap.location) acc.push(datap.location);
        return acc;
      }, []);
      this._store.images = locationEnabledData;
      this._locationsObserver.next(this._store.locations.concat(this._store.images, this._store.events));
    });

    this._eventsSvc.events$.subscribe(data => {
      const locationEnabledData = data.reduce((acc, datap) => {
        if (datap.location) acc.push(datap.location);
        return acc;
      }, []);
      this._store.events = locationEnabledData;
      this._locationsObserver.next(this._store.locations.concat(this._store.images, this._store.events));
    });
  }

  loadAll() {
    if (this._dataLoaded) return this._locationsObserver.next(this._store.locations.concat(this._store.images, this._store.events));

    this._http.get('/mock-data/locations.json').map(res => res.json().locations)
      .map((data: Array<any>) => {
        const newLocations: Array<Location> = data.map((location) => {
          return {
            latitude: location.latitudeE7 / 10000000,
            longitude: location.longitudeE7 / 10000,
            accuracy: null,
            start: moment(parseInt(location.timestampMs))
          }
        });
        return newLocations;
      })
      .subscribe(data => {
        this._dataLoaded = true;
        this._store.locations = data;
        this._locationsObserver.next(this._store.locations.concat(this._store.images, this._store.events));
      }, err => console.log('There was an error loading locations from HAT', err));
  }


}

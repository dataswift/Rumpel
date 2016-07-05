import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { HatApiService } from './hat-api.service';
import { Location } from '../shared/index';
import { EventsService } from './events.service';
import { ImagesService } from './images.service';
import * as moment from 'moment';

@Injectable()
export class LocationsService {
  private locations$: Observable<any>;
  private locationsObserver: Observer<any>;
  private store: { locations: Array<Location> };

  constructor(private hat: HatApiService,
              private _eventsSvc: EventsService,
              private _imagesSvc: ImagesService) {

    this.store = { locations: [] };
    this.locations$ = new Observable(observer => this.locationsObserver = observer).share();
  }

  showAll(): Observable<any> {
    if (this.store.locations.length > 0) {
      console.log('Inside locations if');
      return Observable.of(this.store.locations);
    }

    this.loadAll().subscribe(
      data => {
        this.store.locations = data;
        this.locationsObserver.next(this.store.locations);
      },
      err => console.log(`Locations table could not be found`)
    );
    return this.locations$;
  }

  loadAll(): Observable<any> {
    return this.loadFrom('iphone').map(locations => locations.map(this.locMap));
  }

  loadFrom(source: string): Observable<any> {
    return this.hat.getAllValuesOf('locations', source);
  }

  locMap(location: any): Location {
    return {
      latitude: location.latitude,
      longitude: location.longitude,
      accuracy: null,
      start: moment(parseInt(location.timestampMs))
    };
  }


}

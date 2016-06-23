import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { HatApiService } from './hat-api.service';
import { Event } from '../shared/index';
import * as moment from 'moment';

@Injectable()
export class EventsService {
  events$: Observable<any>;
  private _eventsObserver: Observer<any>;
  private _dataLoaded: boolean;
  private _store: { events: Array<Event> };

  constructor(private _hat: HatApiService) {
    this._dataLoaded = false;
    this._store = { events: [] };
    this.events$ = new Observable(observer => this._eventsObserver = observer).share();
  }

  loadAll() {
    if (this._dataLoaded) return this._eventsObserver.next(this._store.events);

    console.log('HERE', this._eventsObserver);

    this._hat.getTable('events', 'facebook').subscribe(
      data => {
        const newEvents: Array<Event> = data.map((event: any) => {
          return {
            title: event.name,
            description: event.description,
            start: moment(event.start_time),
            end: event.end_time ? moment(event.end_time) : null
          };
        });

        this._dataLoaded = true;
        this._store.events = newEvents;
        this._eventsObserver.next(this._store.events);
      },
      err => console.log(`Table for events from facebook could not be found`)
    );
  }
}

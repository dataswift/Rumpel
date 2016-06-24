import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

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

    Observable.forkJoin(
      this.loadFrom('facebook').map(events => events.map(this.fbMap)),
      this.loadFrom('ical').map(events => events.map(this.icalMap)))
    .subscribe(
      data => {
        const mergedData = data[0].concat(data[1]);
        this._dataLoaded = true;
        this._store.events = mergedData;
        this._eventsObserver.next(this._store.events);
      },
      err => console.log(`Table for events from facebook could not be found`)
    );
  }

  loadFrom(source: string): Observable<any> {
    return this._hat.getTable('events', source);
  }

  fbMap(event): Event {
    return {
      title: event.name,
      description: event.description,
      start: moment(event.start_time),
      end: event.end_time ? moment(event.end_time) : null
    };
  }

  icalMap(event): Event {
    return {
      title: event.summary,
      description: event.description,
      start: moment(event.startDate),
      end: event.endDate ? moment(event.endDate) : null
    };
  }
}

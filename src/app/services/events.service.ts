import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { HatApiService } from './hat-api.service';
import { Event } from '../shared/index';
import * as moment from 'moment';

@Injectable()
export class EventsService {
  private events$: Observable<any>;
  private eventsObserver: Observer<any>;
  private store: { events: Array<Event> };

  constructor(private _hat: HatApiService) {
    this.store = { events: [] };
    this.events$ = new Observable(observer => this.eventsObserver = observer).share();
  }

  showAll(): Observable<any> {
    if (this.store.events.length > 0) {
      console.log('Inside events if');
      return Observable.of(this.store.events);
    }

    this.loadAll().subscribe(
      data => {
        const mergedData = data[0].concat(data[1]);
        this.store.events = mergedData;
        this.eventsObserver.next(this.store.events);
      },
      err => console.log(`Events table could not be found.`)
    );
    return this.events$;
  }

  loadAll(): Observable<any> {
    return Observable.forkJoin(
      this.loadFrom('facebook').map(events => events.map(this.fbMap)),
      this.loadFrom('ical').map(events => events.map(this.icalMap)));
  }

  loadFrom(source: string): Observable<any> {
    return this._hat.getTable('events', source);
  }

  fbMap(event): Event {
    return {
      title: event.name,
      description: event.description,
      start: moment(event.start_time),
      end: event.end_time ? moment(event.end_time) : null,
      source: 'facebook'
    };
  }

  icalMap(event): Event {
    return {
      title: event.summary,
      description: event.description,
      start: moment(event.startDate),
      end: event.endDate ? moment(event.endDate) : null,
      source: 'ical'
    };
  }
}

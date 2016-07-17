import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';

import { HatApiService } from './hat-api.service';
import { DataPoint } from '../shared/index';
import * as moment from 'moment';

@Injectable()
export class EventsService {
  private events$: Subject<Array<DataPoint>>;
  private store: { events: Array<DataPoint> };

  constructor(private hat: HatApiService) {
    this.store = { events: [] };
    this.events$ = <Subject<DataPoint[]>>new Subject();
  }

  getEvents$(): Observable<DataPoint[]> {
    if (this.store.events.length > 0) {
      console.log('Inside events if');
      return Observable.of(this.store.events);
    }

    this.loadAll().subscribe(
      data => {
        const mergedData = data[0].concat(data[1]);
        this.store.events = mergedData;
        console.log(mergedData);
        this.events$.next(this.store.events);
      },
      err => console.log(`Events table could not be found.`)
    );

    return this.events$.asObservable();
  }

  loadAll(): Observable<any> {
    return Observable.forkJoin(
      this.loadFrom('facebook').map(events => events.map(this.fbMap)),
      this.loadFrom('ical').map(events => events.map(this.icalMap)));
  }

  loadFrom(source: string): Observable<any> {
    return this.hat.getAllValuesOf('events', source);
  }

  fbMap(event): DataPoint {
    let newDataPoint = {
      timestamp: moment(event.start_time),
      type: 'event',
      source: 'facebook',
      content: {
        name: event.name,
        description: event.description,
        start: moment(event.start_time),
        end: event.end_time ? moment(event.end_time) : null,
        rsvp: event.rsvp_status,
        calendarName: 'facebook'
      }
    };

    if (event.place && event.place.location) {
      newDataPoint['location'] = {
        latitude: event.place.location.latitude,
        longitude: event.place.location.longitude
      };
    }

    return newDataPoint;
  }

  icalMap(event): DataPoint {
    return {
      timestamp: moment(event.start_time),
      type: 'event',
      source: 'calendar',
      content: {
        name: event.summary,
        description: event.description,
        start: moment(event.start_date),
        end: event.end_date ? moment(event.end_date) : null,
        rsvp: 'unknown',
        calendarName: event.calendar_name
      }
    };
  }
}

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

  getEvents$() {
    return this.events$.asObservable();
  }

  showAll() {
    if (this.store.events.length > 0) {
      console.log('Inside events if');
      return this.events$.next(this.store.events);
    }

    this.loadAll().subscribe(
      dataArray => {
        const data = dataArray[0].concat(dataArray[1]);
        const timeSortedData = data.sort((a, b) => a.timestamp.isAfter(b.timestamp) ? -1 : 1);
        this.store.events = timeSortedData;
        this.events$.next(this.store.events);
      },
      err => console.log(`Events table could not be found.`)
    );
  }

  loadAll(): Observable<any> {
    return Observable.forkJoin(
      this.loadFrom('ical')
        .map(events => events.map(this.icalMap)),
      this.loadFrom('facebook')
        .map(events => events.map(this.fbMap))
      );
  }

  loadFrom(source: string): Observable<any> {
    return this.hat.getAllValuesOf('events', source);
  }

  fbMap(event): DataPoint {
    let newDataPoint = {
      timestamp: moment(event.events.start_time),
      type: 'event',
      source: 'facebook',
      content: {
        name: event.events.name,
        description: event.events.description,
        start: moment(event.events.start_time),
        end: event.events.end_time ? moment(event.events.end_time) : null,
        rsvp: event.events.rsvp_status,
        calendarName: 'facebook'
      }
    };

    if (event.events.place && event.events.place.location) {
      newDataPoint['location'] = {
        latitude: event.events.place.location.latitude,
        longitude: event.events.place.location.longitude
      };
    }

    return newDataPoint;
  }

  icalMap(event): DataPoint {
    return {
      timestamp: moment(event.events.startDate),
      type: 'event',
      source: 'calendar',
      content: {
        name: event.events.summary,
        description: event.events.description,
        start: moment(event.events.startDate),
        end: event.end_date ? moment(event.events.endDate) : null,
        rsvp: 'unknown',
        calendarName: event.events.calendarName
      }
    };
  }
}

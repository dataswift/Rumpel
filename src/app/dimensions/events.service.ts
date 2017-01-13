/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org>
 */

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';

import { HatApiService } from '../services/hat-api.service';
import { Event } from '../shared/interfaces';
import { uniqBy } from 'lodash';
import * as moment from 'moment';

const DATE_REGEX = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;

@Injectable()
export class EventsService {
  private events$: Subject<Array<Event>>;
  private store: { events: Array<Event> };

  constructor(private hat: HatApiService) {
    this.store = { events: [] };
    this.events$ = <Subject<Event[]>>new Subject();
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
        const data = dataArray[0].concat(dataArray[1]).concat(dataArray[2]);
        const timeSortedData = data.sort((a, b) => a.start.isAfter(b.start) ? -1 : 1);
        this.store.events = timeSortedData;
        this.events$.next(this.store.events);
      },
      err => console.log(`Events table could not be found.`)
    );
  }

  private loadAll(): Observable<any> {
    return Observable.forkJoin(
      this.loadFrom('ical')
        .map(events => events.map(this.icalMap)),
      this.loadFrom('facebook')
        .map(events => {
          let rumpEvents = events.map(this.fbMap);
          return uniqBy(rumpEvents, "id");
        }),
      this.loadFrom('google')
        .map(events => {
          let rumpEvents = events.map(this.googleMap);
          return uniqBy(rumpEvents, "id");
        })
    );
  }

  loadFrom(source: string): Observable<any> {
    return this.hat.getAllValuesOf('events', source);
  }

  private fbMap(event): Event {
    let newDataPoint = {
      id: event.data.events.id,
      title: event.data.events.name,
      description: event.data.events.description,
      start: moment(event.data.events.start_time),
      end: event.data.events.end_time ? moment(event.data.events.end_time) : null,
      allDay: false,
      calendarName: 'facebook'
    };

    if (event.data.events.place && event.data.events.place.location) {
      newDataPoint['location'] = {
        latitude: event.data.events.place.location.latitude,
        longitude: event.data.events.place.location.longitude
      };
    }

    return newDataPoint;
  }

  private icalMap(event): Event {
    return {
      title: event.data.events.summary,
      description: event.data.events.description,
      start: moment(event.data.events.startDate),
      end: event.data.events.endDate ? moment(event.data.events.endDate) : null,
      allDay: false,
      calendarName: event.data.events.calendarName
    };
  }

  private googleMap(event): Event {
    return {
      id: event.data.events.id,
      calendarName: 'google',
      title: event.data.events.summary,
      description: event.data.events.description,
      start: moment(event.data.events.start.dateTime || event.data.events.start.date),
      end: event.data.events.end ? moment(event.data.events.end.dateTime || event.data.events.end.date) : null,
      allDay: event.data.events.end && event.data.events.end.date ? true : false,
      link: event.data.events.htmlLink
    };
  }
}

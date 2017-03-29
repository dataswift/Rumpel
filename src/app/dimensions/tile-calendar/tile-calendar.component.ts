/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org>
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../events.service';
import {FacebookEventsService} from '../facebook-events.service';
import {GoogleEventsService} from '../google-events.service';
import { Event } from '../../shared/interfaces/index';

import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs/Rx';
import {UiStateService} from '../../services/ui-state.service';
import {DataTable} from '../../shared/interfaces/data-table.interface';

@Component({
  selector: 'rump-tile-calendar',
  templateUrl: 'tile-calendar.component.html',
  styleUrls: ['tile-calendar.component.scss']
})
export class TileCalendarComponent implements OnInit, OnDestroy {
  private events: Array<{ relativeTime: string; events: Array<Event> }>;
  public eventsExist = false;
  public upcomingEventsExist: boolean;
  private sub: Subscription;

  constructor(private eventsSvc: EventsService,
              private facebookEventSvc: FacebookEventsService,
              private googleEventsSvc: GoogleEventsService,
              private uiStateSvc: UiStateService) {}

  ngOnInit() {
    this.events = [{ relativeTime: 'today', events: [] }, { relativeTime: 'tomorrow', events: [] }];
    this.sub =
      Observable.merge(
        this.eventsSvc.data$,
        this.facebookEventSvc.data$,
        this.googleEventsSvc.data$
      ).subscribe(this.handleEventAddition);

    this.uiStateSvc.tables$.subscribe((tables: DataTable[]) => {
      const foundTable = tables.find((table: DataTable) => table.name === 'events');
      if (foundTable) {
        this.eventsExist = true;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private handleEventAddition(events: Array<Event>): void {
    const upcomingEvents = events
      .filter(event => event.start.isAfter(moment().startOf('day')) && event.start.isBefore(moment().add(1, 'days').endOf('day')))
      .sort((a, b) => a.start.isAfter(b.start) ? 1 : -1);

    if (upcomingEvents.length > 0) {
      const daySplitIndex = upcomingEvents.findIndex(event => event.start.isAfter(moment().endOf('day')));
      this.events[0].events = this.events[0].events.concat(upcomingEvents.splice(0, daySplitIndex));
      this.events[1].events = this.events[1].events.concat(upcomingEvents);

      this.upcomingEventsExist = true;
    } else {
      this.upcomingEventsExist = false;
    }

  }

}

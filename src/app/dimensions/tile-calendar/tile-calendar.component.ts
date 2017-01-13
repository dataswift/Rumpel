/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org>
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../events.service';
import { Event } from '../../shared/interfaces';

import * as moment from 'moment';

@Component({
  selector: 'rump-tile-calendar',
  templateUrl: 'tile-calendar.component.html',
  styleUrls: ['tile-calendar.component.scss']
})
export class TileCalendarComponent implements OnInit, OnDestroy {
  public events: Array<any>;
  public upcomingEventsExist: boolean;
  private sub: any;

  constructor(private eventsSvc: EventsService) {}

  ngOnInit() {
    this.events = [];
    this.sub = this.eventsSvc.getEvents$()
      .subscribe((events: Array<Event>) => {
        let upcomingEvents = events
          .filter(event => event.start.isAfter() && event.start.isBefore(moment().add(1, 'days').endOf('day')))
          .sort((a, b) => a.start.isAfter(b.start) ? 1 : -1);

        if (upcomingEvents.length > 0) {
          this.upcomingEventsExist = true;
          let daySplitIndex = upcomingEvents.findIndex(event => event.start.isAfter(moment().endOf('day')))
          this.events = [
            { relativeTime: 'today', events: upcomingEvents.splice(0, daySplitIndex) },
            { relativeTime: 'tomorrow', events: upcomingEvents }
          ];
        } else {
          this.upcomingEventsExist = false;
        }
      });
    this.eventsSvc.showAll();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

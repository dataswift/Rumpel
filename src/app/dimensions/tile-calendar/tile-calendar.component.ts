import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../events.service';

import * as moment from 'moment';

@Component({
  selector: 'rump-tile-calendar',
  templateUrl: 'tile-calendar.component.html',
  styleUrls: ['tile-calendar.component.scss']
})
export class TileCalendarComponent implements OnInit, OnDestroy {
  public events;
  public upcomingEventsExist: boolean;
  private sub: any;

  constructor(private eventsSvc: EventsService) {}

  ngOnInit() {
    this.events = [];
    this.sub = this.eventsSvc.getEvents$()
      .subscribe(events => {
        let upcomingEvents = events
          .filter(event => event.timestamp.isAfter() && event.timestamp.isBefore(moment().add(1, 'days').endOf('day')))
          .sort((a, b) => a.timestamp.isAfter(b.timestamp) ? 1 : -1);

        if (upcomingEvents.length > 0) {
          this.upcomingEventsExist = true;
          let daySplitIndex = upcomingEvents.findIndex(event => event.timestamp.isAfter(moment().endOf('day')))
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../../services';

@Component({
  selector: 'rump-tile-calendar',
  templateUrl: 'tile-calendar.component.html',
  styleUrls: ['tile-calendar.component.scss']
})
export class TileCalendarComponent implements OnInit, OnDestroy {
  public events;
  private sub: any;

  constructor(private eventsSvc: EventsService) {}

  ngOnInit() {
    this.sub = this.eventsSvc.getEvents$()
      .subscribe(events => {
        this.events = events;
      });
    this.eventsSvc.showAll();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

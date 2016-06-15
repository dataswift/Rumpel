import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services';
import { Moment } from '../../pipes/moment.pipe';

@Component({
  moduleId: module.id,
  selector: 'rump-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.css'],
  pipes: [Moment]
})
export class CalendarComponent implements OnInit {
  private _eventsSub;
  public events;

  constructor(private _eventsSvc: EventsService) {}

  ngOnInit() {
    this._eventsSub = this._eventsSvc.events$.subscribe(updatedEvents => {
      this.events = updatedEvents;
      console.log(this.events);
    });

    this._eventsSvc.loadAll();
  }

}

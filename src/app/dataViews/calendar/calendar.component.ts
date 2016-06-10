import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services';

@Component({
  moduleId: module.id,
  selector: 'rump-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.css']
})
export class CalendarComponent implements OnInit {
  events$;

  constructor(private _eventsSvc: EventsService) {}

  ngOnInit() {
    this.events$ = this._eventsSvc.events$;

    this._eventsSvc.loadAll();
  }

}

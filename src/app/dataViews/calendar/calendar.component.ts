import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services';
import { Moment } from '../../pipes/moment.pipe';
import { Schedule } from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'rump-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.css'],
  pipes: [Moment],
  directives: [Schedule]
})
export class CalendarComponent implements OnInit {
  private _eventsSub;
  public events;
  public headerConfig: any;

  constructor(private _eventsSvc: EventsService) {}

  ngOnInit() {
    this.headerConfig = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    };

    this._eventsSub = this._eventsSvc.events$.subscribe(updatedEvents => {
      this.events = updatedEvents;
    });

    this._eventsSvc.loadAll();
  }

}

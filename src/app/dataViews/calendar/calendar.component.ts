import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services';
import { Moment, ExtractContentPipe } from '../../pipes';
import { Schedule } from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'rump-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.css'],
  pipes: [Moment, ExtractContentPipe],
  directives: [Schedule]
})
export class CalendarComponent implements OnInit {
  private _eventsSub;
  public events$;
  public headerConfig: any;

  constructor(private eventsSvc: EventsService) {}

  ngOnInit() {
    this.headerConfig = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    };

    this.events$ = this.eventsSvc.getEvents$();
  }

}

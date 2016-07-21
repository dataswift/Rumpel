import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services';
import { Moment } from '../../pipes';

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'rump-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.css'],
  pipes: [Moment],
})
export class CalendarComponent implements OnInit {
  private sub;
  private events;
  private header: any;
  private viewChoices: string;
  private defaultView: string;
  private defaultDate: string;
  private firstDay: number;
  private height: string;

  constructor(private eventsSvc: EventsService) {}

  ngOnInit() {
    this.viewChoices = 'month,agendaWeek,agendaDay';
    this.defaultView = "agendaWeek";
    this.defaultDate = '2016-02-16';
    this.firstDay = 1;
    this.height = '85vh';
    this.events = [];
    this.header = {
      left: 'prev,next,today',
      center: 'title',
      right: this.viewChoices
    };

    $("#calendar").fullCalendar('destroy');

    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: this.viewChoices
      },
      defaultDate: this.defaultDate,
      defaultView: this.defaultView,
      firstDay: this.firstDay,
      editable: false,
      selectable: true,
      events: this.events,
      height: this.height
    });

    this.sub = this.eventsSvc.getEvents$().subscribe((events: any)  => {
      this.events = events.map(dp => {
        return {
          title: dp.content.name,
          start: dp.content.start.format(),
          end: !!dp.content.end ? dp.content.end.format() : null
        };
      });

      console.log('DA DA', this.events);

      this.updateCalendar();
    });
  }

  private updateCalendar() {
    $('#calendar').fullCalendar('addEventSource', this.events);
  }

}

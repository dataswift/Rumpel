import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Post, Tweet, Event, Photo, Location } from '../../shared/interfaces/index';

@Component({
  selector: 'rump-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {

  @Input() item: Array<Event>;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Moment } from '../../pipes/moment.pipe';

@Component({
  moduleId: module.id,
  selector: 'rump-view-by-day',
  templateUrl: 'view-by-day.component.html',
  styleUrls: ['view-by-day.component.css'],
  pipes: [Moment]
})
export class ViewByDayComponent implements OnInit {
  @Input() images: Array<any>;
  @Input() events: Array<any>;
  @Output() timeSelected = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
  }

  selectTime(day: any) {
    this.timeSelected.emit(day);
  }

}

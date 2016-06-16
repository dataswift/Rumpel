import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Moment } from '../../pipes/moment.pipe';

@Component({
  moduleId: module.id,
  selector: 'rump-timeline',
  templateUrl: 'timeline.component.html',
  styleUrls: ['timeline.component.css'],
  pipes: [Moment]
})
export class TimelineComponent implements OnInit {
  @Input() timeline: Array<any>;
  @Output() timeSelected = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
  }

  selectTime(day: any) {
    this.timeSelected.emit(day);
  }
}

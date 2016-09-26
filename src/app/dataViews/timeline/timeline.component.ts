import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rump-timeline',
  templateUrl: 'timeline.component.html',
  styleUrls: ['timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnChanges {
  @Input() timeline: Array<any>;
  @Output() timeSelected = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
  }

  ngOnChanges() {
    this.timeline.sort((day1, day2) => day1.isAfter(day2, 'day') ? -1 : 1);
  }

  selectTime(day: any) {
    this.timeSelected.emit(day);
  }
}

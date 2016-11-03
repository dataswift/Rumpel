import {Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChange} from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core'
import { Moment } from 'moment';

@Component({
  selector: 'rump-timeline',
  templateUrl: 'timeline.component.html',
  styleUrls: ['timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnChanges {
  @Input() timeline: Array<Moment>;
  @Input() selectedTime: Moment;
  @Output() timeSelected = new EventEmitter<Moment>();
  private selected: Moment;
  private timelineGrouped: Array<[string, Array<Moment>]> = [];

  @ViewChild('timelineScroll') private timelineScrollContainer: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {

    for (let propName in changes) {
      if (propName === 'timeline') {
        if (this.timeline && this.timeline.length > 0 && !this.selectedTime) {
          this.selected = this.timeline[0]
        } else if (this.selectedTime) {
          this.selected = this.selectedTime;
        }

        let grouped = this.timeline.reduce(function (acc, item) {
          let month = item.format("MMMM, YYYY");
          if (month in acc) {
            acc[month].push(item);
          }
          else {
            acc[month] = new Array<Moment>(item);
          }
          return acc;
        }, {});

        this.timelineGrouped = [];
        for (let month in grouped) {
          this.timelineGrouped.push([month, grouped[month]])
        }
      }
    }
  }

  selectTime(day: Moment) {
    this.selected = day;
    this.timeSelected.emit(day);
  }

  scrollUp() {
    try {
      this.timelineScrollContainer.nativeElement.scrollTop = this.timelineScrollContainer.nativeElement.scrollTop - 100;
    } catch(err) { console.error(err); }
  }

  scrollDown() {
    try {
      this.timelineScrollContainer.nativeElement.scrollTop = this.timelineScrollContainer.nativeElement.scrollTop + 100;
    } catch(err) { console.error(err); }
  }
}

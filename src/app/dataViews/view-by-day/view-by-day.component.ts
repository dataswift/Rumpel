import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { DataPoint } from '../../shared';
import { DataPointComponent } from '../data-point/data-point.component';
import { Moment } from '../../pipes/moment.pipe';

@Component({
  moduleId: module.id,
  selector: 'rump-view-by-day',
  templateUrl: 'view-by-day.component.html',
  styleUrls: ['view-by-day.component.css'],
  directives: [DataPointComponent],
  pipes: [Moment]
})
export class ViewByDayComponent implements OnInit, OnChanges {
  @Input() dataPoints: Array<DataPoint>;
  @Input() day;
  @Output() timeSelected = new EventEmitter<any>();

  public visibility = { img: true, eve: true, loc: true };

  constructor() {}

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.dataPoints) {
      // this.visibility.eve = !this.events.length;
      // this.visibility.loc = !this.locations;
    }
  }

  selectTime(day: any) {
    this.timeSelected.emit(day);
  }

}

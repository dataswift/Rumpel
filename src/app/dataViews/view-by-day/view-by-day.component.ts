import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { DataPoint } from '../../shared';

@Component({
  selector: 'rump-view-by-day',
  templateUrl: 'view-by-day.component.html',
  styleUrls: ['view-by-day.component.scss']
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

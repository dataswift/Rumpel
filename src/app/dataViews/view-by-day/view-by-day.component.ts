import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Moment } from '../../pipes/moment.pipe';

@Component({
  moduleId: module.id,
  selector: 'rump-view-by-day',
  templateUrl: 'view-by-day.component.html',
  styleUrls: ['view-by-day.component.css'],
  pipes: [Moment]
})
export class ViewByDayComponent implements OnInit, OnChanges {
  @Input() images: Array<any>;
  @Input() events: Array<any>;
  @Input() locations: Array<any>;
  @Input() day;
  @Output() timeSelected = new EventEmitter<any>();

  public visibility = { img: true, eve: true, loc: true };

  constructor() {}

  ngOnInit() {
  }

  ngOnChanges() {
    this.visibility.img = !this.images.length;
    this.visibility.eve = !this.events.length;
    this.visibility.loc = !this.locations;
  }

  selectTime(day: any) {
    this.timeSelected.emit(day);
  }

}

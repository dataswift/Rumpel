import { Component, OnInit } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { TimelineViewComponent } from '../../timeline-view';
import { ViewByDayComponent } from '../view-by-day/view-by-day.component';

@Component({
  moduleId: module.id,
  selector: 'rump-mixpad',
  templateUrl: 'mixpad.component.html',
  styleUrls: ['mixpad.component.css'],
  directives: [MapComponent, TimelineViewComponent, ViewByDayComponent]
})
export class MixpadComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}

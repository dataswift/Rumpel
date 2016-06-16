import { Component, OnInit, Input } from '@angular/core';
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

  constructor() {}

  ngOnInit() {
  }
}

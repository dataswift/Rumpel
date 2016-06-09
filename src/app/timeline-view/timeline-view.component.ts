import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rump-timeline-view',
  templateUrl: 'timeline-view.component.html',
  styleUrls: ['timeline-view.component.css']
})
export class TimelineViewComponent implements OnInit {

  demoTimeline = [
    {
      year: 2016,
      month: 'June',
      entries: {
        locations: 21,
        photos: 15,
        events: 42,
        posts: 14
      }
    },
    {
      year: 2016,
      month: 'May',
      entries: {
        locations: 3,
        photos: 16,
        events: 27,
        posts: 62
      }
    },
    {
      year: 2016,
      month: 'April',
      entries: {
        locations: 9,
        photos: 5,
        events: 13,
        posts: 34
      }
    }
  ];

  constructor() {}

  ngOnInit() {
  }

}

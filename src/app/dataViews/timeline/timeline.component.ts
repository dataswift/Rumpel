import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService, LocationsService, ImagesService } from '../../services';
import { Moment } from '../../pipes/moment.pipe';
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'rump-timeline',
  templateUrl: 'timeline.component.html',
  styleUrls: ['timeline.component.css'],
  pipes: [Moment]
})
export class TimelineComponent implements OnInit, OnDestroy {
  private _locSub;
  private _eveSub;
  private _imgSub;
  public timeline: Array<any>;

  constructor(private _locationsSvc: LocationsService,
              private _eventsSvc: EventsService,
              private _imagesSvc: ImagesService) {
    this.timeline = [moment()];
  }

  ngOnInit() {
    this._locSub = this._locationsSvc.locations$.subscribe(locations => {
      for (let loc of locations) {
        const foundDay = this.timeline.find(day => day.isSame(loc.timestamp, 'day'));
        if (foundDay) continue;
        this.timeline.push(loc.timestamp);
      }

      this.timeline.sort((day1, day2) => day1.isAfter(day2, 'day') ? -1 : 1);
    });

    this._eveSub = this._eventsSvc.events$.subscribe(events => {
      for (let eve of events) {
        const foundDay = this.timeline.find(day => day.isSame(eve.startTime, 'day'));
        if (foundDay) continue;
        this.timeline.push(eve.startTime);
      }

      this.timeline.sort((day1, day2) => day1.isAfter(day2, 'day') ? -1 : 1);
    });

    this._imgSub = this._imagesSvc.images$.subscribe(images => {
      for (let img of images) {
        const foundDay = this.timeline.find(day => day.isSame(img.timestamp, 'day'));
        if (foundDay) continue;
        this.timeline.push(img.timestamp);
      }

      this.timeline.sort((day1, day2) => day1.isAfter(day2, 'day') ? -1 : 1);
    });

    this._imagesSvc.loadAll();
    this._eventsSvc.loadAll();
    this._locationsSvc.loadAll();
  }

  ngOnDestroy() {
    this._imgSub.unsubscribe();
    this._eveSub.unsubscribe();
    this._locSub.unsubscribe();
  }

}

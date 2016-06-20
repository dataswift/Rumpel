import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { TimelineComponent } from '../timeline/timeline.component';
import { ViewByDayComponent } from '../view-by-day/view-by-day.component';
import { EventsService, LocationsService, ImagesService } from '../../services';
import { FilterByTime } from '../../pipes/filter-by-time.pipe';
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'rump-mixpad',
  templateUrl: 'mixpad.component.html',
  styleUrls: ['mixpad.component.css'],
  directives: [MapComponent, TimelineComponent, ViewByDayComponent],
  pipes: [FilterByTime]
})
export class MixpadComponent implements OnInit, OnDestroy {
  private _locSub;
  private _eveSub;
  private _imgSub;
  public selectedTime: any;
  public shownComponents: any;
  public locations;
  public events;
  public images;
  public timeline: Array<any>;

  constructor(private _locationsSvc: LocationsService,
              private _eventsSvc: EventsService,
              private _imagesSvc: ImagesService) {
    this.timeline = [moment()];
    this.shownComponents = { map: true, events: true, photos: true, timeline: true };
  }

  ngOnInit() {
    this._locSub = this._locationsSvc.locations$.subscribe(locations => {
      this.locations = locations;

      for (let loc of locations) {
        const foundDay = this.timeline.find(day => day.isSame(loc.start, 'day'));
        if (foundDay) continue;
        this.timeline.push(loc.start);
      }
    });

    this._eveSub = this._eventsSvc.events$.subscribe(events => {
      this.events = events;

      for (let eve of events) {
        const foundDay = this.timeline.find(day => day.isSame(eve.start, 'day'));
        if (foundDay) continue;
        this.timeline.push(eve.start);
      }
    });

    this._imgSub = this._imagesSvc.images$.subscribe(images => {
      this.images = images;

      for (let img of images) {
        const foundDay = this.timeline.find(day => day.isSame(img.start, 'day'));
        if (foundDay) continue;
        this.timeline.push(img.start);
      }
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

  onViewReset() {
    this.selectedTime = null;
  }

}

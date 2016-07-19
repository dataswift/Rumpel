import { Component, OnInit } from '@angular/core';
import { DomSanitizationService } from '@angular/platform-browser';
import { MapComponent } from '../map/map.component';
import { TimelineComponent } from '../timeline/timeline.component';
import { ViewByDayComponent } from '../view-by-day/view-by-day.component';
import { EventsService, LocationsService, ImagesService } from '../../services';
import { TimeFilterPipe, LocationFilterPipe, DataTypeFilterPipe } from '../../pipes';
import { DataPoint } from '../../shared';
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'rump-mixpad',
  templateUrl: 'mixpad.component.html',
  styleUrls: ['mixpad.component.css'],
  directives: [MapComponent, TimelineComponent, ViewByDayComponent],
  pipes: [TimeFilterPipe, LocationFilterPipe, DataTypeFilterPipe]
})
export class MixpadComponent implements OnInit {
  private eventSub;
  private imgSub;
  public data: Array<DataPoint>;
  public selectedTime: any;
  public shownComponents: any;
  public safeSize;
  public timeline: Array<any>;

  constructor(private locationsSvc: LocationsService,
              private eventsSvc: EventsService,
              private imagesSvc: ImagesService,
              private sanitizer: DomSanitizationService) {
    let now = moment();
    this.selectedTime = now;
    this.timeline = [now];
    this.data = [];
    this.shownComponents = { map: true, events: true, photos: true, timeline: true };
  }

  ngOnInit() {
    this.locationsSvc.getLocations$()
      .merge(this.eventsSvc.getEvents$())
      .subscribe((dataPoints: Array<DataPoint>) => {

        for (let dp of dataPoints) {
          const dayFound = this.timeline.find(day => day.isSame(dp.timestamp, 'day'));
          if (dayFound) continue;
          this.timeline.push(dp.timestamp);
        }

        this.data = dataPoints;
      });

    this.locationsSvc.showAll();

    this.safeSize = this.sanitizer.bypassSecurityTrustStyle('85vh');
  }

  onViewReset() {
    this.selectedTime = null;
  }

}

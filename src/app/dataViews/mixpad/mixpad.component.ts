import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EventsService, LocationsService, ImagesService, SocialService } from '../../services';
import { DataPoint } from '../../shared';
import * as moment from 'moment';

@Component({
  selector: 'rump-mixpad',
  templateUrl: 'mixpad.component.html',
  styleUrls: ['mixpad.component.scss']
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
              private socialSvc: SocialService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    let now = moment();
    this.selectedTime = now;
    this.timeline = [now];
    this.data = [];
    this.shownComponents = { map: false, events: true, photos: true, timeline: true };

    this.socialSvc.showAll()
      .merge(this.eventsSvc.getEvents$())
      .merge(this.imagesSvc.loadAll())
      .merge(this.locationsSvc.getLocations$())
      .subscribe((dataPoints: Array<DataPoint>) => {

        for (let dp of dataPoints) {
          const dayFound = this.timeline.find(day => day.isSame(dp.timestamp, 'day'));
          if (dayFound) continue;
          this.timeline.push(dp.timestamp);
        }

        this.timeline = this.timeline.sort((a, b) => a.isAfter(b) ? -1 : 1)

        this.data = this.data.concat(dataPoints);
      });

    this.locationsSvc.showAll();

    this.safeSize = this.sanitizer.bypassSecurityTrustStyle('85vh');
  }

  onViewReset() {
    this.selectedTime = null;
  }

}

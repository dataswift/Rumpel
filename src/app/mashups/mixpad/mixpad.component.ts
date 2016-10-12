import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotosService } from '../../photos/photos.service';
import { EventsService } from '../../dimensions/events.service';
import { SocialService } from '../../social/social.service';
import { LocationsService } from '../../locations/locations.service';
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
              private photosSvc: PhotosService,
              private socialSvc: SocialService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    let now = moment();
    this.selectedTime = now;
    this.timeline = [now];
    this.data = [];
    this.shownComponents = { map: false, events: true, photos: true, timeline: true };

    this.socialSvc.socialFeed$
      .merge(this.eventsSvc.getEvents$())
      .merge(this.photosSvc.loadAll())
      .merge(this.locationsSvc.locations$)
      .subscribe((dataPoints: Array<DataPoint>) => {

        for (let dp of dataPoints) {
          const dayFound = this.timeline.find(day => day.isSame(dp.timestamp, 'day'));
          if (dayFound) continue;
          this.timeline.push(dp.timestamp);
        }

        this.timeline = this.timeline.sort((a, b) => a.isAfter(b) ? -1 : 1)

        this.data = this.data.concat(dataPoints);
      });

    this.socialSvc.getRecentPosts();
    this.locationsSvc.getRecentLocations();

    this.safeSize = this.sanitizer.bypassSecurityTrustStyle('85vh');
  }

  onViewReset() {
    this.selectedTime = null;
  }
}

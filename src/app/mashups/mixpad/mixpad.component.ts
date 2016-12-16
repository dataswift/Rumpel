import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotosService } from '../../photos/photos.service';
import { EventsService } from '../../dimensions/events.service';
import { SocialService } from '../../social/social.service';
import { LocationsService } from '../../locations/locations.service';
import { Post, Event, Photo, Location } from '../../shared/interfaces/index';
import { ExpandedTime } from '../../shared/interfaces/index';
import * as moment from 'moment';
import { sortedUniqBy, unionBy } from 'lodash';
import { NotablesService } from "../../notables/notables.service";
import { Notable } from "../../shared/interfaces/notable.class";

@Component({
  selector: 'rump-mixpad',
  templateUrl: 'mixpad.component.html',
  styleUrls: ['mixpad.component.scss']
})
export class MixpadComponent implements OnInit {
  private eventSub;
  private imgSub;
  private posts: Array<Post> = [];
  private events: Array<Event> = [];
  private locations: Array<Location> = [];
  private photos: Array<Photo> = [];
  private notables: Array<Notable> = [];
  public selectedTime: ExpandedTime;
  public shownComponents: { [key:string]:boolean };
  public safeSize;
  public timeline: Array<ExpandedTime>;

  constructor(private locationsSvc: LocationsService,
              private eventsSvc: EventsService,
              private photosSvc: PhotosService,
              private socialSvc: SocialService,
              private notablesSvc: NotablesService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    let now = moment();
    this.selectedTime = new ExpandedTime(now);
    this.timeline = [new ExpandedTime(now)];
    this.shownComponents = { map: true, events: true, photos: true, timeline: true };

    this.eventsSvc.getEvents$().subscribe(events => {
      this.addDatesToTimeline(events, 'start');
      this.events = events.sort((a, b) => a.start.isBefore(b.start) ? -1 : 1);
    });

    this.photosSvc.photos$.subscribe(photos => {
      this.addDatesToTimeline(photos, 'timestamp');
      this.photos = photos;
    });

    this.socialSvc.socialFeed$.subscribe(posts => {
      this.addDatesToTimeline(posts, 'createdTime');
      this.posts = posts;
    });

    this.locationsSvc.locations$.subscribe(locations => {
      this.addDatesToTimeline(locations, 'timestamp');
      this.locations = locations;
    });

    this.notablesSvc.data$.subscribe(notables => {
      this.addDatesToTimeline(notables, 'created_time');
      this.notables = notables;
    });

    this.socialSvc.getRecentPosts();
    this.locationsSvc.getRecentLocations();
    this.photosSvc.getRecentPhotos();
    this.eventsSvc.showAll();
    this.notablesSvc.getRecentData();

    this.safeSize = this.sanitizer.bypassSecurityTrustStyle('73em');
  }

  addDatesToTimeline(dataPoints: Array<any>, timeField: string) {
    //console.log(dataPoints);
    let timestamps: Array<ExpandedTime> = sortedUniqBy(
      dataPoints.map(dp => new ExpandedTime(dp[timeField])).sort((a, b) => a.unixDayStart > b.unixDayStart ? -1 : 1),
      'unixDayStart');

    this.timeline = unionBy(this.timeline, timestamps, 'unixDayStart').sort((a, b) => a.unixDayStart > b.unixDayStart ? -1 : 1);

    // for (let dp of dataPoints) {
    //   let timestamp = dp[timeField];
    //   const dayFound = newTimeline.find(day => day.isSame(timestamp, 'day'));
    //   if (!dayFound) {
    //     newTimeline.push(timestamp);
    //   }
    // }

    // this.timeline = _.sortedUniqBy(newTimeline.sort((a, b) => a.isAfter(b) ? -1 : 1), date => date.startOf('day').format());
  }

  selectTime(event) {
    this.selectedTime = event;
  }

  selectControlsTime(relativeTime: string) {
    switch (relativeTime) {
      case 'today':
        this.selectedTime = new ExpandedTime(moment());
        break;
      case 'yesterday':
        this.selectedTime = new ExpandedTime(moment().subtract(1, 'days'));
        break;
    }
  }

  isSelectedTime(relativeTime: string): boolean {
    switch (relativeTime) {
      case 'today':
        return this.selectedTime.unixDayStart === moment().startOf('day').unix();
      case 'yesterday':
        return this.selectedTime.unixDayStart === moment().subtract(1, 'days').startOf('day').unix();
    }
  }

  onViewReset() {
    this.selectedTime = null;
  }
}

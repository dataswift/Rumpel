import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotosService } from '../../photos/photos.service';
import { EventsService } from '../../dimensions/events.service';
import { SocialService } from '../../social/social.service';
import { LocationsService } from '../../locations/locations.service';
import { Post, Event, Photo, Location } from '../../shared/interfaces';
import * as moment from 'moment';

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
    this.shownComponents = { map: false, events: true, photos: true, timeline: true };

    this.eventsSvc.getEvents$().subscribe(events => {
      this.addDatesToTimeline(events, 'start');
      this.events = events;
    });

    this.photosSvc.loadAll().subscribe(photos => {
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

    this.socialSvc.getRecentPosts();
    this.locationsSvc.getRecentLocations();

    this.safeSize = this.sanitizer.bypassSecurityTrustStyle('73em');
  }

  addDatesToTimeline(dataPoints: Array<any>, timeField: string) {
    console.log(dataPoints);
    for (let dp of dataPoints) {
      const dayFound = this.timeline.find(day => day.isSame(dp[timeField], 'day'));
      if (dayFound) continue;
      this.timeline.push(dp[timeField]);
    }

    this.timeline = this.timeline.sort((a, b) => a.isAfter(b) ? -1 : 1);
  }

  selectTime(event) {
    this.selectedTime = event;
  }

  onViewReset() {
    this.selectedTime = null;
  }
}

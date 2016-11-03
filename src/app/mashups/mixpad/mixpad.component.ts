import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotosService } from '../../photos/photos.service';
import { EventsService } from '../../dimensions/events.service';
import { SocialService } from '../../social/social.service';
import { LocationsService } from '../../locations/locations.service';
//import { Post, Event, Photo, Location } from '../../shared/interfaces';
import * as moment from 'moment';
import Moment = moment.Moment;
import * as _ from "lodash";
import {Photo} from "../../shared/interfaces/photo.interface";
import {Post} from "../../shared/interfaces/post.interface";
import {Event} from "../../shared/interfaces/event.interface";
import {Location} from "../../shared/interfaces/location.interface";
import {NotablesService} from "../../notables/notables.service";
import {Notable} from "../../shared/interfaces/notable.class";

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
  public selectedTime: Moment;
  public shownComponents: { [key:string]:boolean };
  public safeSize;
  public timeline: Array<Moment>;

  constructor(private locationsSvc: LocationsService,
              private eventsSvc: EventsService,
              private photosSvc: PhotosService,
              private socialSvc: SocialService,
              private notablesSvc: NotablesService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    let now = moment();
    this.selectedTime = now;
    this.timeline = [now];
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

    this.notablesSvc.notables$.subscribe(notables => {
      this.addDatesToTimeline(notables, 'created_time');
      this.notables = notables;
    });

    this.socialSvc.getRecentPosts();
    this.locationsSvc.getRecentLocations();
    this.photosSvc.getRecentPhotos();
    this.eventsSvc.showAll();
    this.notablesSvc.getRecentNotables();

    this.safeSize = this.sanitizer.bypassSecurityTrustStyle('73em');
  }

  addDatesToTimeline(dataPoints: Array<any>, timeField: string) {
    //console.log(dataPoints);
    let timestamps: Array<Moment> = _.sortedUniqBy(
      dataPoints.map(dp => dp[timeField]).sort((a, b) => a.isAfter(b) ? -1 : 1),
      date => date.startOf('day').format());

    this.timeline = _.unionBy(this.timeline, timestamps, date => date.startOf('day').format()).sort((a, b) => a.isAfter(b) ? -1 : 1);

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

  onViewReset() {
    this.selectedTime = null;
  }
}

/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotosService } from '../../photos/photos.service';
import { EventsService } from '../../dimensions/events.service';
import { SocialService } from '../../social/social.service';
import { LocationsService } from '../../locations/locations.service';
import { Post, Event, Photo, Location } from '../../shared/interfaces/index';
import { ExpandedTime } from '../../shared/interfaces/index';
import * as moment from 'moment';
import * as _ from 'lodash';
import { NotablesService } from '../../notables/notables.service';
import { Notable } from '../../shared/interfaces/notable.class';
import {Subscription, Observable} from 'rxjs/Rx';
import {FacebookEventsService} from '../../dimensions/facebook-events.service';
import {GoogleEventsService} from '../../dimensions/google-events.service';

@Component({
  selector: 'rump-my-day',
  templateUrl: 'my-day.component.html',
  styleUrls: ['my-day.component.scss']
})
export class MyDayComponent implements OnInit {
  private eventsSub: Subscription;
  private imgSub;
  public posts: Array<Post> = [];
  public events: Array<Event> = [];
  public locations: Array<Location> = [];
  public photos: Array<Photo> = [];
  public notables: Array<Notable> = [];
  public selectedTime: ExpandedTime;
  public shownComponents: { map: boolean; events: boolean; photos: boolean; timeline: boolean;   };
  public safeSize;
  private totalDP = 0;
  public loading = false;
  public timeline: Array<ExpandedTime>;

  constructor(private locationsSvc: LocationsService,
              private eventsSvc: EventsService,
              private facebookEventsSvc: FacebookEventsService,
              private googleEventsSvc: GoogleEventsService,
              private photosSvc: PhotosService,
              private socialSvc: SocialService,
              private notablesSvc: NotablesService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    const now = moment();
    this.selectedTime = new ExpandedTime(now);
    this.timeline = [new ExpandedTime(now)];
    this.shownComponents = { map: true, events: true, photos: true, timeline: true };

    this.eventsSub =
      Observable.merge(
        this.eventsSvc.data$,
        this.facebookEventsSvc.data$,
        this.googleEventsSvc.data$
      )
        .subscribe((events: Array<Event>) => {
          this.addDatesToTimeline(events, 'start');
          this.events = this.events.concat(events).sort((a, b) => a.start.isBefore(b.start) ? -1 : 1);
        });

    this.photosSvc.photos$.subscribe(photos => {
      this.addDatesToTimeline(photos, 'timestamp');
      this.photos = photos;
    });

    this.socialSvc.data$.subscribe((posts: Array<Post>) => {
      this.addDatesToTimeline(posts, 'createdTime');
      this.posts = posts;
    });

    this.locationsSvc.data$.subscribe(locations => {
      this.addDatesToTimeline(locations, 'timestamp');
      this.locations = locations;

      if (locations.length > this.totalDP) {
        this.totalDP = locations.length;
        this.locationsSvc.getMoreData(500, 5000);
      }
    });

    this.locationsSvc.loading$.subscribe(isLoading => this.loading = isLoading);

    this.notablesSvc.data$.subscribe(notables => {
      this.addDatesToTimeline(notables, 'created_time');
      this.notables = notables;
    });

    this.safeSize = this.sanitizer.bypassSecurityTrustStyle('73em');
  }

  addDatesToTimeline(dataPoints: Array<any>, timeField: string) {
    // console.log(dataPoints);
    const timestamps: Array<ExpandedTime> = _.sortedUniqBy(
      dataPoints.map(dp => new ExpandedTime(dp[timeField])).sort((a, b) => a.unixDayStart > b.unixDayStart ? -1 : 1),
      'unixDayStart');

    this.timeline = _.unionBy(this.timeline, timestamps, 'unixDayStart')
      .sort((a, b) => a.unixDayStart > b.unixDayStart ? -1 : 1)
      .filter((a: ExpandedTime) => a.timestamp.isValid());

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

  loadMoreData() {
    this.socialSvc.getMoreData(50);
    this.locationsSvc.getMoreData(1000, 15000);
    this.eventsSvc.getMoreData(50);
    this.facebookEventsSvc.getMoreData(50);
    this.googleEventsSvc.getMoreData(50);
    this.notablesSvc.getMoreData(50);
  }
}

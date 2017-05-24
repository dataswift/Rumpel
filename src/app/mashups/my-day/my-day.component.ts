/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotosService } from '../../photos/photos.service';
import { EventsService } from '../../dimensions/events.service';
import { SocialService } from '../../social/social.service';
import { TwitterService } from '../../social/twitter.service';
import { LocationsService } from '../../locations/locations.service';
import { Post, Tweet, Event, Photo, Location } from '../../shared/interfaces/index';
import { ExpandedTime } from '../../shared/interfaces/index';
import * as moment from 'moment';
import { Moment } from 'moment';
import * as _ from 'lodash';
import { NotablesService } from '../../notables/notables.service';
import { Notable } from '../../shared/interfaces/notable.class';
import {Subscription, Observable} from 'rxjs/Rx';
import {FacebookEventsService} from '../../dimensions/facebook-events.service';
import {GoogleEventsService} from '../../dimensions/google-events.service';

declare var $: any;

@Component({
  selector: 'rump-my-day',
  templateUrl: 'my-day.component.html',
  styleUrls: ['my-day.component.scss']
})


export class MyDayComponent implements OnInit, OnDestroy {

  @Input() selectedTime: ExpandedTime;

  private eventsSub: Subscription;
  private twitterSub: Subscription;
  private locationSub: Subscription;
  private photoSub: Subscription;
  private socialSub: Subscription;
  private notableSub: Subscription;

  private imgSub;
  public posts: Array<Post> = [];
  public events: Array<Event> = [];
  public locations: Array<Location> = [];
  public photos: Array<Photo> = [];
  public tweets: Array<Tweet> = [];
  public notables: Array<Notable> = [];

  public shownComponents: { map: boolean; events: boolean; photos: boolean; timeline: boolean;   };
  public safeSize;
  public safeSizeSidebar;
  private totalDP = 0;
  public loading = false;
  public timeline: Array<ExpandedTime>;
  public eventList = [];
  public activityList: Array<any> = [];
  public moment: Moment = moment();



  constructor(private locationsSvc: LocationsService,
              private eventsSvc: EventsService,
              private facebookEventsSvc: FacebookEventsService,
              private googleEventsSvc: GoogleEventsService,
              private photosSvc: PhotosService,
              private socialSvc: SocialService,
              private twitterSvc: TwitterService,
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



    this.photoSub = this.photosSvc.photos$.subscribe(photos => {
      this.addDatesToTimeline(photos, 'timestamp');
      this.photos = photos;
    });

    this.socialSub = this.socialSvc.data$.subscribe((posts: Array<Post>) => {
      this.addDatesToTimeline(posts, 'createdTime');
      this.posts = posts;
    });

    this.twitterSub = this.twitterSvc.data$.subscribe((tweets: Array<Tweet>) => {
      this.addDatesToTimeline(tweets, 'createdTime');
      this.tweets = tweets;
    });

    this.locationSub = this.locationsSvc.data$.subscribe(locations => {
      this.addDatesToTimeline(locations, 'timestamp');
      this.locations = locations;

      if (locations.length > this.totalDP) {
        this.totalDP = locations.length;
        const self = this;
        setTimeout( function(){ self.locationsSvc.getMoreData(250, 5000); }, 5000);
      }
    });

    this.locationsSvc.loading$.subscribe(isLoading => this.loading = isLoading);

    this.notableSub = this.notablesSvc.data$.subscribe(notables => {
      this.addDatesToTimeline(notables, 'created_time');
      this.notables = notables;
    });

    this.safeSize = this.sanitizer.bypassSecurityTrustStyle($(window).height() - 180 + 'px');
    this.safeSizeSidebar = this.sanitizer.bypassSecurityTrustStyle($(window).height() - 203 + 'px');
    const thisScope = this;

    $(window).resize(function() {
      thisScope.safeSize = thisScope.sanitizer.bypassSecurityTrustStyle($(window).height() - 180 + 'px');
      thisScope.safeSizeSidebar = thisScope.sanitizer.bypassSecurityTrustStyle($(window).height() - 203 + 'px');
    });

  }



  addDatesToTimeline(dataPoints: Array<any>, timeField: string) {
    // console.log(dataPoints);
    const timestamps: Array<ExpandedTime> = _.sortedUniqBy(
      dataPoints.map(dp => new ExpandedTime(dp[timeField])).sort((a, b) => a.unixDayStart > b.unixDayStart ? -1 : 1),
      'unixDayStart');

    this.timeline = _.unionBy(this.timeline, timestamps, 'unixDayStart')
      .sort((a, b) => a.unixDayStart > b.unixDayStart ? -1 : 1)
      .filter((a: ExpandedTime) => a.timestamp.isSameOrBefore(this.moment, 'day'))
      .filter((a: ExpandedTime) => a.timestamp.isValid());





    this.eventList = [];

    for (let i = 0; i < this.timeline.length; i++) {
      this.eventList.push({ timestamp: this.timeline[i].timestamp, activities: [], selected: (i === 0) });

      for ( let j = 0; j < this.events.length; j++) {
        if ( this.events[j].start.isSame(this.timeline[i].timestamp, 'day') ) {
          this.eventList[ this.eventList.length - 1 ].activities.push( {
            event: this.events[j],
            type: 'event',
            title: this.events[j].title,
            description: this.events[j].description,
            startTime: this.events[j].start,
            endTime: this.events[j].end,
            image: '',
            icon: (this.events[j].calendarName === 'google' ? 'google-calendar' :
                    this.events[j].calendarName === 'facebook' ? 'facebook' : 'calendar')

          });
        }
      }


      for ( let j = 0; j < this.notables.length; j++) {
        if ( this.notables[j].created_time.isSame(this.timeline[i].timestamp, 'day') ) {
          this.eventList[ this.eventList.length - 1 ].activities.push( {
            event: this.notables[j],
            type: 'notable',
            title: this.notables[j].message,
            description: (this.notables[j].isShared ? 'Public' : 'Private'),
            startTime: this.notables[j].created_time,
            endTime: '',
            image: '',
            icon: 'notable'

          });
        }
      }

      for ( let j = 0; j < this.photos.length; j++) {
        if ( this.photos[j].timestamp.isSame(this.timeline[i].timestamp, 'day') ) {
          this.eventList[ this.eventList.length - 1 ].activities.push( {
            event: this.photos[j],
            type: 'photo',
            title: this.photos[j].name,
            description: '',
            startTime: this.photos[j].timestamp,
            endTime: '',
            image: this.photos[j].path,
            icon: 'photo'

          });
        }
      }

      for ( let j = 0; j < this.posts.length; j++) {
        if ( this.posts[j].createdTime.isSame(this.timeline[i].timestamp, 'day') ) {
          this.eventList[ this.eventList.length - 1 ].activities.push( {
            event: this.posts[j],
            type: 'facebook',
            title: '',
            description: '',
            startTime: this.posts[j].createdTime,
            endTime: '',
            image: '',
            icon: 'facebook'

          });
        }
      }

      for ( let j = 0; j < this.tweets.length; j++) {
        if ( this.tweets[j].createdTime.isSame(this.timeline[i].timestamp, 'day') ) {
          this.eventList[ this.eventList.length - 1 ].activities.push( { event: this.tweets[j], type: 'twitter' } );
        }
      }

      const locationList = [];
      for ( let j = 0; j < this.locations.length; j++) {
        if ( this.locations[j].timestamp.isSame(this.timeline[i].timestamp, 'day') ) {
          locationList.push(this.locations[j]);
        }
      }
      if (locationList.length > 0) {
        this.eventList[ this.eventList.length - 1 ].activities.push( { event: locationList, type: 'location' } );
      }
    }
    // console.log(this.eventList);

    this.eventList = this.eventList.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    });

    // for (let dp of dataPoints) {
    //   let timestamp = dp[timeField];
    //   const dayFound = newTimeline.find(day => day.isSame(timestamp, 'day'));
    //   if (!dayFound) {
    //     newTimeline.push(timestamp);
    //   }
    // }

    // this.timeline = _.sortedUniqBy(newTimeline.sort((a, b) => a.isAfter(b) ? -1 : 1), date => date.startOf('day').format());
    // console.log(this.timeline);
  }


  ngOnDestroy(): void {
    this.eventsSub.unsubscribe();
    this.twitterSub.unsubscribe();
    this.locationSub.unsubscribe();
    this.photoSub.unsubscribe();
    this.socialSub.unsubscribe();
    this.notableSub.unsubscribe();
  }



  selectTime(event) {
    this.selectedTime = event;
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

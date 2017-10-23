/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SocialService } from '../../social/social.service';
import { TwitterService } from '../../social/twitter.service';
import { DataPlugService } from '../../data-management/data-plug.service';
import { LocationsService } from '../../locations/locations.service';
import { Post, Tweet, Event, Location } from '../../shared/interfaces/index';
import { ExpandedTime } from '../../shared/interfaces/index';
import { Fitbit } from '../../fitbit/fitbit.interface';
import { Monzo } from '../../monzo/monzo.interface';
import * as moment from 'moment';
import { Moment } from 'moment';
import * as _ from 'lodash';
import { NotablesService } from '../../notables/notables.service';
import { Notable } from '../../shared/interfaces/notable.class';
import { Subscription, Observable } from 'rxjs/Rx';
import { FacebookEventsService } from '../../dimensions/facebook-events.service';
import { GoogleEventsService } from '../../dimensions/google-events.service';
import { FitbitService } from '../../fitbit/fitbit.service';
import { MonzoService } from '../../monzo/monzo.service';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';

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
  private socialSub: Subscription;
  private notableSub: Subscription;
  private fitbitSub: Subscription;
  private monzoSub: Subscription;
  public posts: HatRecord<Post>[] = [];
  public events: HatRecord<Event>[] = [];
  public locations: HatRecord<Location>[] = [];
  public tweets: HatRecord<Tweet>[] = [];
  public notables: HatRecord<Notable>[] = [];
  public fitbits: HatRecord<Fitbit>[] = [];
  public monzos: HatRecord<Monzo>[] = [];

  public shownComponents: { map: boolean; events: boolean; photos: boolean; timeline: boolean;   };
  public safeSize;
  public safeSizeSidebar;
  private totalDP = 0;
  public loading = false;
  public timeline: Array<ExpandedTime>;
  public eventList = [];
  public activityList: Array<any> = [];
  public moment: Moment = moment();
  public locationList = [];
  public locationDataDownloaded = [];
  public datesInRange = [];
  public hasLocationData = false;
  public dataplugs: Subscription;

  constructor(private locationsSvc: LocationsService,
              private facebookEventsSvc: FacebookEventsService,
              private googleEventsSvc: GoogleEventsService,
              private socialSvc: SocialService,
              private twitterSvc: TwitterService,
              private notablesSvc: NotablesService,
              private fitbitSvc: FitbitService,
              private monzoSvc: MonzoService,
              private dataplugsSvc: DataPlugService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.dataplugs = this.dataplugsSvc.dataplugs$.subscribe(plugs => {
      for (let i = 0; i < plugs.length; i++) {
        if (plugs[i].name === 'location') {
          this.hasLocationData = true;
        }
      }
    });

    const now = moment();
    this.selectedTime = new ExpandedTime(now);
    this.timeline = [new ExpandedTime(now)];
    this.shownComponents = { map: true, events: true, photos: true, timeline: true };

    this.eventsSub =
      Observable.merge(
        this.facebookEventsSvc.data$,
        this.googleEventsSvc.data$
      )
        .subscribe((events: HatRecord<Event>[]) => {
          this.addDatesToTimeline(events, 'start');
          this.addDataToEventsList('event');
          this.events = this.events.concat(events).sort((a, b) => a.data.start.isBefore(b.data.start) ? -1 : 1);
        });

    this.socialSub = this.socialSvc.data$.subscribe((posts: HatRecord<Post>[]) => {
      this.addDatesToTimeline(posts, 'createdTime');
      this.addDataToEventsList('facebook');
      this.posts = posts;
    });

    this.twitterSub = this.twitterSvc.data$.subscribe((tweets: HatRecord<Tweet>[]) => {
      this.addDatesToTimeline(tweets, 'createdTime');
      this.addDataToEventsList('twitter');
      this.tweets = tweets;
    });

    this.fitbitSub = this.fitbitSvc.data$.subscribe((fitbits: HatRecord<Fitbit>[]) => {
      this.addDatesToTimeline(fitbits, 'dateTime');
      this.addDataToEventsList('fitbit');
      this.fitbits = fitbits;
    });

    this.monzoSub = this.monzoSvc.data$.subscribe((monzos: HatRecord<Monzo>[]) => {
      this.addDatesToTimeline(monzos, 'dateTime');
      this.addDataToEventsList('monzo');
      this.monzos = monzos;
    });

    this.locationSub = this.locationsSvc.data$.subscribe((locations: HatRecord<Location>[]) => {
      this.addDatesToTimeline(locations, 'timestamp');

      this.locations = locations;

      this.addToLocationList(this.totalDP, this.locations.length);
      this.addDataToEventsList('location');
    });

    this.locationsSvc.loading$.subscribe(isLoading => this.loading = isLoading);

    this.notableSub = this.notablesSvc.data$.subscribe(notables => {
      this.addDatesToTimeline(notables, 'created_time');
      this.addDataToEventsList('notable');
      this.notables = notables;
    });

    this.safeSize = this.sanitizer.bypassSecurityTrustStyle($(window).height() - 180 + 'px');
    this.safeSizeSidebar = this.sanitizer.bypassSecurityTrustStyle($(window).height() - 259 + 'px');
    const thisScope = this;

    $(window).resize(function() {
      thisScope.safeSize = thisScope.sanitizer.bypassSecurityTrustStyle($(window).height() - 180 + 'px');
      thisScope.safeSizeSidebar = thisScope.sanitizer.bypassSecurityTrustStyle($(window).height() - 259 + 'px');
    });
  }

  getDatesInRange(array) {
    this.datesInRange = array;
    const newMonths = this.datesInRange;

    for (let j = 0; j < newMonths.length; j++) {
      for (let i = 0; i < this.locationDataDownloaded.length; i++) {
        if (this.locationDataDownloaded[i] === newMonths[j]) {
          newMonths.splice(j, 1);
        }
      }
    }

    this.loadLocationData(newMonths);
  }

  loadLocationData(newMonths) {
    for (let k = 0; k < newMonths.length; k++) {
      this.locationDataDownloaded.push(newMonths[k]);
      const startTime = moment(newMonths[k], 'MM YYYY').startOf('month').format('X');
      const endTime = moment(newMonths[k], 'MM YYYY').endOf('month').format('X');
      // this.locationsSvc.getTimeIntervalData(startTime, endTime);
    }
  }

  addToLocationList(start: number, end: number) {
    for (let i = 0; i < this.timeline.length; i++) {
      for (let j = start; j < end; j++) {
          if (this.locations[j].data.timestamp.isSame(this.timeline[i].timestamp, 'day')) {
            if (start === 0 || !this.locations[j].data.timestamp.isSame(this.locationList[this.locationList.length - 1], 'day')) {
              this.locationList.push(this.locations[j].data.timestamp.format('DD-MM-YYYY'));
              break;
            }
          }
      }
    }
  }

  addDatesToTimeline(dataPoints: HatRecord<any>[], timeField: string) {
    // console.log(dataPoints);
    const timestamps: Array<ExpandedTime> = _.sortedUniqBy(
      dataPoints.map(dp => new ExpandedTime(moment(dp.data[timeField]))).sort((a, b) => a.unixDayStart > b.unixDayStart ? -1 : 1),
      'unixDayStart');

    this.timeline = _.unionBy(this.timeline, timestamps, 'unixDayStart')
      .sort((a, b) => a.unixDayStart > b.unixDayStart ? -1 : 1)
      .filter((a: ExpandedTime) => a.timestamp.isSameOrBefore(this.moment, 'day'))
      .filter((a: ExpandedTime) => a.timestamp.isValid());
  }

  addDataToEventsList(type: string) {
    this.eventList = [];

    for (let i = 0; i < this.timeline.length; i++) {
      this.eventList.push({ timestamp: this.timeline[i].timestamp, activities: [], selected: (i === 0) });

      for (let j = 0; j < this.events.length; j++) {
        if (this.events[j].data.start.isSame(this.timeline[i].timestamp, 'day')) {
          this.eventList[ this.eventList.length - 1 ].activities.push( {
            event: this.events[j].data,
            type: 'event',
            title: this.events[j].data.title,
            description: this.events[j].data.description,
            startTime: this.events[j].data.start,
            endTime: this.events[j].data.end,
            image: '',
            icon: (this.events[j].data.calendarName === 'google' ? 'google-calendar' :
              this.events[j].data.calendarName === 'facebook' ? 'facebook' : 'calendar')
          });
        }
      }

      for (let j = 0; j < this.notables.length; j++) {
        if (this.notables[j].data.created_time.isSame(this.timeline[i].timestamp, 'day')) {
          this.eventList[ this.eventList.length - 1 ].activities.push( {
            event: this.notables[j],
            type: 'notable',
            title: this.notables[j].data.message,
            description: (this.notables[j].data.isShared ? 'Public' : 'Private'),
            startTime: this.notables[j].data.created_time,
            endTime: '',
            image: '',
            icon: 'notable'

          });
        }
      }

      for (let j = 0; j < this.posts.length; j++) {
        if (this.posts[j].data.createdTime.isSame(this.timeline[i].timestamp, 'day')) {
          this.eventList[ this.eventList.length - 1 ].activities.push( {
            event: this.posts[j],
            type: 'facebook',
            title: '',
            description: '',
            startTime: this.posts[j].data.createdTime,
            endTime: '',
            image: '',
            icon: 'facebook'

          });
        }
      }

      for (let j = 0; j < this.tweets.length; j++) {
        if (this.tweets[j].data.createdTime.isSame(this.timeline[i].timestamp, 'day')) {
          this.eventList[ this.eventList.length - 1 ].activities.push({ event: this.tweets[j], type: 'twitter' });
        }
      }

      for ( let j = 0; j < this.fitbits.length; j++) {
        if ( moment(this.fitbits[j].data.dateTime, 'YYYY-MM-DD').isSame(this.timeline[i].timestamp, 'day') ) {
          this.eventList[ this.eventList.length - 1 ].activities.push( { event: this.fitbits[j], type: 'fitbit' } );
        }
      }


      for ( let j = 0; j < this.monzos.length; j++) {
        if ( moment(this.monzos[j].data.dateTime).isSame(this.timeline[i].timestamp, 'day') ) {
          this.eventList[ this.eventList.length - 1 ].activities.push( { event: this.monzos[j], type: 'monzo' } );
        }
      }

      this.locationList = this.locationList.filter(function(elem, index, self) {
          return index === self.indexOf(elem);
      });

      for ( let j = 0; j < this.locationList.length; j++) {
        const thisActivities = this.eventList[ this.eventList.length - 1 ].activities;
        if (this.locationList[j] === this.timeline[i].timestamp.format('DD-MM-YYYY') ) {
          thisActivities.push( { event: this.locationList[j], type: 'location' } );
        }
      }
    }

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
    // console.log(this.eventList);
  }

  ngOnDestroy(): void {
    this.eventsSub.unsubscribe();
    this.twitterSub.unsubscribe();
    this.locationSub.unsubscribe();
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
    this.socialSvc.getMoreData(100);
    this.locationsSvc.getMoreData(1000, 10000);
    this.facebookEventsSvc.getMoreData(100);
    this.googleEventsSvc.getMoreData(100);
    this.notablesSvc.getMoreData(100);
  }
}

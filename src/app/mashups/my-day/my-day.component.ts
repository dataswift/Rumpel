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
import { Post, Tweet, Event } from '../../shared/interfaces/index';
import * as moment from 'moment';
import { Moment } from 'moment';
import { mergeWith, groupBy } from 'lodash';
import { NotablesService } from '../../notables/notables.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { FacebookEventsService } from '../../dimensions/facebook-events.service';
import { GoogleEventsService } from '../../dimensions/google-events.service';
import { FitbitActivitySummaryService } from '../../fitbit/services/fitbit-activity-summary.service';
import { MonzoService } from '../../monzo/monzo.service';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';
import { LocationIos } from '../../shared/interfaces/location.interface';

declare var $: any;

@Component({
  selector: 'rump-my-day',
  templateUrl: 'my-day.component.html',
  styleUrls: ['my-day.component.scss']
})

export class MyDayComponent implements OnInit, OnDestroy {
  @Input() selectedTime: string;

  private locationSub: Subscription;
  private dataStreamSub: Subscription;
  public locations: HatRecord<LocationIos>[] = [];
  public cardList: { [date: string]: HatRecord<any>[]; };

  public safeSize;
  public safeSizeSidebar;
  public loading = false;
  public locationDataDownloaded = [];
  public datesInRange = [];
  public moment: Moment = moment();
  public hasLocationData = false;
  public dataplugs: Subscription;

  constructor(private locationsSvc: LocationsService,
              private facebookEventsSvc: FacebookEventsService,
              private googleEventsSvc: GoogleEventsService,
              private socialSvc: SocialService,
              private twitterSvc: TwitterService,
              private notablesSvc: NotablesService,
              private fitbitSvc: FitbitActivitySummaryService,
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

    this.selectedTime = moment().format('YYYY-MM-DD');

    this.dataStreamSub = Observable.merge(
      this.facebookEventsSvc.data$,
      this.googleEventsSvc.data$,
      this.socialSvc.data$,
      this.twitterSvc.data$,
      this.notablesSvc.data$
    )
    .subscribe((dataEntities: HatRecord<any>[]) => {
      const groupedRecords = this.groupByDate(dataEntities);
      this.cardList = mergeWith(this.cardList, groupedRecords, this.cardMergeCustomiser);
    });

    this.locationSub = this.locationsSvc.data$.subscribe((locations: HatRecord<LocationIos>[]) => {
      const groupedLocations = this.groupByDate(locations);
      const squashedAndGroupedLocations = {};

      for (const key in groupedLocations) {
        if (groupedLocations.hasOwnProperty(key)) {
          squashedAndGroupedLocations[key] = [{
            endpoint: groupedLocations[key][0].endpoint,
            recordId: null,
            data: groupedLocations[key].length
          }];
        }
      }

      this.cardList = mergeWith(this.cardList, squashedAndGroupedLocations, this.cardMergeCustomiser);
      this.locations = mergeWith(this.locations, groupedLocations, this.cardMergeCustomiser);
    });

    this.locationsSvc.loading$.subscribe(isLoading => this.loading = isLoading);

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

  groupByDate(dataEntities: HatRecord<any>[]): { [date: string]: HatRecord<any>[] } {
    let extractDateString: (entity: HatRecord<any>) => string;
    const endpoint = dataEntities.length > 0 ? dataEntities[0].endpoint : '';

    switch (endpoint) {
      case 'google/events':
        extractDateString = entity => entity.data.start.format('YYYY-MM-DD');
        break;
      case 'facebook/events':
        extractDateString = entity => entity.data.start.format('YYYY-MM-DD');
        break;
      case 'rumpelstaging/notablesv1':
        extractDateString = entity => entity.data.created_time.format('YYYY-MM-DD');
        break;
      case 'facebook/posts':
        extractDateString = entity => entity.data.createdTime.format('YYYY-MM-DD');
        break;
      case 'twitter/tweets':
        extractDateString = entity => entity.data.createdTime.format('YYYY-MM-DD');
        break;
      case 'iphone/locations':
        extractDateString = entity => entity.data.timestamp.format('YYYY-MM-DD');
        break;
      default:
        extractDateString = entity => moment().format('YYYY-MM-DD');
        break;
    }

    return groupBy(dataEntities, extractDateString);
  }

  ngOnDestroy(): void {
    this.locationSub.unsubscribe();
    this.dataStreamSub.unsubscribe();
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

  private cardMergeCustomiser(objValue, srcValue): Array<any> {
    if (Array.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  }
}

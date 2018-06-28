/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LocationsService } from '../../locations/locations.service';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';
import { LocationIos } from '../../shared/interfaces/location.interface';
import { SheFeedService } from '../../she/she-feed.service';
import { DayGroupedSheFeed, SheMapItem } from '../../she/she-feed.interface';

@Component({
  selector: 'rum-my-day',
  templateUrl: 'my-day.component.html',
  styleUrls: ['my-day.component.scss']
})

export class MyDayComponent implements OnInit, OnDestroy {
  @Input() selectedTime: string;

  private locationSub: Subscription;
  private dataStreamSub: Subscription;
  public locations: SheMapItem[] = [];
  public cardList: { [date: string]: HatRecord<any>[]; };

  public safeSize;
  public safeSizeSidebar;
  public loading = false;
  public locationDataDownloaded = [];
  public datesInRange = [];
  public moment: Moment = moment();
  public hasLocationData = false;
  public dataplugs: Subscription;

  public feed$: Observable<DayGroupedSheFeed[]>;
  public locations$: Observable<SheMapItem[]>;

  constructor(private sheSvc: SheFeedService,
              private locationsSvc: LocationsService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.feed$ = this.sheSvc.getInitFeed();

    const sheLocations$ = this.getSheLocationStream();
    const iosLocations$ = this.getDeviceLocationStream();

    this.locations$ = Observable.combineLatest(sheLocations$, iosLocations$).map(results => results[0].concat(results[1]));

    this.selectedTime = moment().format('YYYY-MM-DD');

    this.updateMapSize(100, 160);
    window.addEventListener('resize', () => this.updateMapSize(100, 160));

    this.loadMoreData();
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

  ngOnDestroy(): void {
  }

  selectTime(event) {
    this.selectedTime = event;
  }

  onViewReset() {
    this.selectedTime = null;
  }

  loadMoreData() {
    this.locationsSvc.getMoreData(1000, 10000);
  }

  private getSheLocationStream(): Observable<SheMapItem[]> {
    return this.feed$
      .map((days: DayGroupedSheFeed[]) => days.reduce((acc, day) => {
        return acc.concat(day.data
          .filter(feedItem => feedItem.location && feedItem.location.geo)
          .map(feedItem => {
            return {
              source: feedItem.source,
              timestamp: feedItem.date.unix,
              latitude: feedItem.location.geo.latitude,
              longitude: feedItem.location.geo.longitude,
              content: {
                title: feedItem.title.text || '',
                body: feedItem.content.text || ''
              }
            };
          }));
      }, []));
  }

  private getDeviceLocationStream(): Observable<SheMapItem[]> {
    return this.locationsSvc.data$.map((locations: HatRecord<LocationIos>[]) => {
      return locations.map(location => {
        return {
          source: 'ios',
          timestamp: location.data.dateCreated,
          latitude: location.data.latitude,
          longitude: location.data.longitude
        };
      });
    });
  }

  private updateMapSize(sizeOffset: number, sidebarSizeOffset: number): void {
    this.safeSize = this.sanitizer.bypassSecurityTrustStyle(window.outerHeight - sizeOffset + 'px');
    this.safeSizeSidebar = this.sanitizer.bypassSecurityTrustStyle(window.outerHeight - sidebarSizeOffset + 'px');
  }
}

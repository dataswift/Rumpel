/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LocationsService } from '../../locations/locations.service';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';
import { LocationIos } from '../../shared/interfaces/location.interface';
import { SheFeedService } from '../../she/she-feed.service';
import { DayGroupedSheFeed, SheMapItem } from '../../she/she-feed.interface';
import { Filter } from '../../shared/interfaces/bundle.interface';

@Component({
  selector: 'rum-my-day',
  templateUrl: 'my-day.component.html',
  styleUrls: ['my-day.component.scss']
})

export class MyDayComponent implements OnInit, OnDestroy {
  public locations: SheMapItem[] = [];

  public safeSize;
  public safeSizeSidebar;
  public loading = false;
  public locationDataDownloaded = [];
  public datesInRange = [];

  public selectedTime: Moment = null;

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

    this.locations$ = combineLatest(sheLocations$, iosLocations$).pipe(map(results => results[0].concat(results[1])));

    this.updateMapSize(115, 110);
    window.addEventListener('resize', () => this.updateMapSize(115, 110));

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
  }

  ngOnDestroy(): void {
  }

  applyTimeFilter(changeEvent): void {
    const from = changeEvent.value.startOf('day').unix();
    const to = changeEvent.value.endOf('day').unix();

    const locationsFilter: Filter[] = [{
      field: 'dateCreated',
      transformation: {
        transformation: 'identity'
      },
      operator: {
        operator: 'between',
        lower: from,
        upper: to
      }
    }];

    this.locationsSvc.getTimeIntervalData(locationsFilter);
    this.sheSvc.getTimeBoundData(from, to);
  }

  selectTime(event) {
    this.selectedTime = moment.unix(event);
  }

  onViewReset() {
    this.selectedTime = null;
  }

  loadMoreData() {
    this.locationsSvc.getMoreData(1000, 5000);
  }

  private getSheLocationStream(): Observable<SheMapItem[]> {
    return this.feed$.pipe(
      map((days: DayGroupedSheFeed[]) => days.reduce((acc, day) => {
        return acc.concat(day.data
          .filter(feedItem => feedItem.location && feedItem.location.geo)
          .map(feedItem => {
            return {
              source: feedItem.source,
              timestamp: feedItem.date.unix,
              latitude: feedItem.location.geo.latitude,
              longitude: feedItem.location.geo.longitude,
              content: {
                title: feedItem.title ? feedItem.title.text || '' : '',
                body: feedItem.content ? feedItem.content.text || '' : ''
              }
            };
          }));
      }, []))
    );
  }

  private getDeviceLocationStream(): Observable<SheMapItem[]> {
    return this.locationsSvc.data$.pipe(map((locations: HatRecord<LocationIos>[]) => {
      return locations.map(location => {
        return {
          source: 'iOS',
          timestamp: location.data.dateCreated,
          latitude: location.data.latitude,
          longitude: location.data.longitude,
          altitude: location.data.altitude,
          speed: location.data.speed
        };
      });
    }));
  }

  private updateMapSize(sizeOffset: number, sidebarSizeOffset: number): void {
    this.safeSize = this.sanitizer.bypassSecurityTrustStyle(window.innerHeight - sizeOffset + 'px');
    this.safeSizeSidebar = this.sanitizer.bypassSecurityTrustStyle(window.innerHeight - sidebarSizeOffset + 'px');
  }
}

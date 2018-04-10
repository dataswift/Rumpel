import { Injectable } from '@angular/core';

import { HatApiService } from '../core/services/hat-api.service';
import { AuthService } from '../core/services/auth.service';

import { SheFeed } from './she-feed.interface';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import * as subDays from 'date-fns/sub_days';
import * as addDays from 'date-fns/add_days';
import * as startOfDay from 'date-fns/start_of_day';
import * as endOfDay from 'date-fns/end_of_day';
import * as format from 'date-fns/format';
import { groupBy } from 'lodash';

interface DayGroupedSheFeed {
  day: string;
  data: SheFeed[];
}

@Injectable()
export class SheFeedService {
  private _feed$: ReplaySubject<DayGroupedSheFeed[]> = <ReplaySubject<DayGroupedSheFeed[]>>new ReplaySubject(1);
  private _subfeed$: ReplaySubject<SheFeed[]> = <ReplaySubject<SheFeed[]>>new ReplaySubject(1);
  private store: { [endpoint: string]: { since: number, until: number, data: SheFeed[] } } = {};

  constructor(private hat: HatApiService,
              private authSvc: AuthService) {
  }

  getInitFeed(): Observable<DayGroupedSheFeed[]> {
    const defaultSince = Math.round(startOfDay(subDays(Date.now(), 14)) / 1000);
    const defaultUntil = Math.round(endOfDay(addDays(Date.now(), 7)) / 1000);

    this.hat.getSheRecords('', defaultSince, defaultUntil)
      .subscribe((feedItems: SheFeed[]) => {
        const groupedByDay = groupBy(feedItems, item => <string>format(item.date.unix * 1000, 'YYYY-MM-DD'));
        const dayGroupedSheFeed = Object.keys(groupedByDay)
          .map((day: string) => {
            return { day: day, data: groupedByDay[day] }
          });

        this._feed$.next(dayGroupedSheFeed);
      });

    return this._feed$.asObservable();
  }


  getInitData(endpoint: string = ''): Observable<SheFeed[]> {
    if (!this.store[endpoint] || (!endpoint && !this.store['main'])) {
      const defaultSince = Math.round(subDays(Date.now(), 14) / 1000);
      const defaultUntil = Math.round(addDays(Date.now(), 7) / 1000);

      this.hat.getSheRecords(endpoint, defaultSince, defaultUntil)
        .subscribe((feedItems: SheFeed[]) => {
          this.store[endpoint || 'main'] = {
            since: defaultSince,
            until: defaultUntil,
            data: feedItems
          };

          this._subfeed$.next(this.store[endpoint || 'main'].data)
        });
    } else {
      this._subfeed$.next(this.store[endpoint || 'main'].data);
    }

    return this._subfeed$.asObservable();
  }
}

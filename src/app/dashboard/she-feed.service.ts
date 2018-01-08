import { Injectable } from '@angular/core';

import { HatApiV2Service } from '../services/hat-api-v2.service';
import { UserService } from '../user/user.service';
import { BaseDataService } from '../services/base-data.service';

import { HatRecord } from '../shared/interfaces/hat-record.interface';
import { SheFeed } from './she-feed.interface';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SheFeedService extends BaseDataService<SheFeed> {

  constructor(hat: HatApiV2Service,
              userSvc: UserService) {
    super(hat, userSvc, 'she', 'feed', 'date.unix');
  }

  filteredBy$(provider: string): Observable<HatRecord<SheFeed>[]> {
    return this.data$.map((feedItems: HatRecord<SheFeed>[]) => {
      return feedItems.filter((item: HatRecord<SheFeed>) => item.data.source === provider);
    })
  }

  coerceType(rawFeedItem: HatRecord<any>): HatRecord<SheFeed> {
    return {
      endpoint: rawFeedItem.endpoint,
      recordId: rawFeedItem.recordId,
      data: <SheFeed>rawFeedItem.data
    };
  }

}

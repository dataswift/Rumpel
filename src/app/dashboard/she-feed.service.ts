import { Injectable } from '@angular/core';

import { HatApiV2Service } from '../services/hat-api-v2.service';
import { UserService } from '../user/user.service';
import { BaseDataService } from '../services/base-data.service';

import { HatRecord } from '../shared/interfaces/hat-record.interface';
import { SheFeed } from './she-feed.interface';

@Injectable()
export class SheFeedService extends BaseDataService<SheFeed> {

  constructor(hat: HatApiV2Service,
              userSvc: UserService) {
    super(hat, userSvc, 'she', 'feed', 'date.unix');
  }

  coerceType(rawFeedItem: HatRecord<any>): HatRecord<SheFeed> {
    return {
      endpoint: rawFeedItem.endpoint,
      recordId: rawFeedItem.recordId,
      data: <SheFeed>rawFeedItem.data
    };
  }

}

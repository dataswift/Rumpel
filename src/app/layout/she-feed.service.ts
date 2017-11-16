import { Injectable } from '@angular/core';
import { HatApiV2Service } from '../services/hat-api-v2.service';
import { UiStateService } from '../services/ui-state.service';
import { BaseDataService } from '../services/base-data.service';

import { HatRecord } from '../shared/interfaces/hat-record.interface';
import { SheFeed } from './she-feed.interface';

@Injectable()
export class SheFeedService extends BaseDataService<SheFeed> {

  constructor(hat: HatApiV2Service,
              uiSvc: UiStateService) {
    super(hat, uiSvc, 'she', 'feed', 'date.unix');
  }

  coerceType(rawFeedItem: HatRecord<any>): HatRecord<SheFeed> {
    return {
      endpoint: rawFeedItem.endpoint,
      recordId: rawFeedItem.recordId,
      data: <SheFeed>rawFeedItem.data
    };
  }

}

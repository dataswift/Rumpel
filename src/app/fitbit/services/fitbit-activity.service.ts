import { Injectable } from '@angular/core';

import { BaseDataService } from '../../services/base-data.service';
import { HatApiV2Service } from '../../services/hat-api-v2.service';
import { UserService } from '../../user/user.service';

import { HatRecord } from '../../shared/interfaces/hat-record.interface';
import { FitbitActivity } from '../interfaces/fitbit-activity.interface';


@Injectable()
export class FitbitActivityService extends BaseDataService<FitbitActivity> {

  constructor(hat: HatApiV2Service, uiSvc: UserService) {
    super(hat, uiSvc, 'fitbit', 'activity', 'lastModified')
  }

  coerceType(rawFitbit: HatRecord<any>): HatRecord<FitbitActivity> {
    return {
      endpoint: rawFitbit.endpoint,
      recordId: rawFitbit.recordId,
      data: <FitbitActivity>rawFitbit.data
    }
  }
}

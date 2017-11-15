import { Injectable } from '@angular/core';
import { BaseDataService } from '../../services/base-data.service';
import { FitbitActivity } from '../interfaces/fitbit-activity.interface';
import { HatApiV2Service } from '../../services/hat-api-v2.service';
import { UiStateService } from '../../services/ui-state.service';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';

@Injectable()
export class FitbitActivityService extends BaseDataService<FitbitActivity> {

  constructor(hat: HatApiV2Service, uiSvc: UiStateService) {
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

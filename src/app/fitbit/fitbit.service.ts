import { Injectable } from '@angular/core';

import { Fitbit } from './fitbit.interface';

import * as moment from 'moment';
import { BaseDataService } from '../services/base-data.service';
import { UiStateService } from '../services/ui-state.service';
import { HatApiV2Service } from '../services/hat-api-v2.service';
import {HatRecord} from '../shared/interfaces/hat-record.interface';

@Injectable()
export class FitbitService extends BaseDataService<Fitbit> {

  constructor(hat: HatApiV2Service, uiSvc: UiStateService) {
    super(hat, uiSvc, 'fitbit', 'activity/day/summary', 'dateCreated');
  }

  coerceType(rawFitbit: HatRecord<any>): HatRecord<Fitbit> {
    const fitbitContent = rawFitbit;

    const fitbit: Fitbit = {
      dateTime: moment(fitbitContent.data.dateTime),
      steps: fitbitContent.data.steps,
      restingHeartRate: fitbitContent.data.restingHeartRate,
      sleep: fitbitContent.data.sleep
    };

    return {
      endpoint: rawFitbit.endpoint,
      recordId: rawFitbit.recordId,
      data: fitbit
    };
  }

}

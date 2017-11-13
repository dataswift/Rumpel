import { Injectable } from '@angular/core';
import { BaseDataService } from '../services/base-data.service';
import { UiStateService } from '../services/ui-state.service';
import { HatApiV2Service } from '../services/hat-api-v2.service';

import { FitbitActivitySummary, FitbitActivityDistance } from './fitbit.interface';
import { HatRecord } from '../shared/interfaces/hat-record.interface';
import * as moment from 'moment';

@Injectable()
export class FitbitService extends BaseDataService<FitbitActivitySummary> {

  constructor(hat: HatApiV2Service, uiSvc: UiStateService) {
    super(hat, uiSvc, 'fitbit', 'activity/day/summary', 'dateCreated');
  }

  coerceType(rawFitbit: HatRecord<any>): HatRecord<FitbitActivitySummary> {
    const fitbitContent = rawFitbit.data;

    const fitbit = {
      dateCreated: fitbitContent.dateCreated,
      activityCalories: fitbitContent.activityCalories,
      caloriesBMR: fitbitContent.caloriesBMR,
      caloriesOut: fitbitContent.caloriesOut,
      distances: <FitbitActivityDistance[]>fitbitContent.distances,
      fairlyActiveMinutes: fitbitContent.fairlyActiveMinutes,
      lightlyActiveMinutes: fitbitContent.lightlyActiveMinutes,
      marginalCalories: fitbitContent.marginalCalories,
      sedentaryMinutes: fitbitContent.sedentaryMinutes,
      steps: fitbitContent.steps,
      veryActiveMinutes: fitbitContent.veryActiveMinutes
    };

    return {
      endpoint: rawFitbit.endpoint,
      recordId: rawFitbit.recordId,
      data: fitbit
    };
  }

}

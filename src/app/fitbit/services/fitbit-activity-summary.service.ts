import { Injectable } from '@angular/core';
import { BaseDataService } from '../../services/base-data.service';
import { AuthService } from '../../core/services/auth.service';
import { HatApiService } from '../../core/services/hat-api.service';

import { FitbitActivitySummary, FitbitActivityDistance } from '../interfaces/fitbit-activity-summary.interface';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';


@Injectable()
export class FitbitActivitySummaryService extends BaseDataService<FitbitActivitySummary> {

  constructor(hat: HatApiService, authSvc: AuthService) {
    super(hat, authSvc, 'fitbit', 'activity/day/summary', 'summaryDate');
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
      summaryDate: fitbitContent.summaryDate,
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

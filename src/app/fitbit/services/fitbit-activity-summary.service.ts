import { Injectable } from '@angular/core';
import { BaseDataService } from '../../services/base-data.service';
import { UserService } from '../../user/user.service';
import { HatApiV2Service } from '../../services/hat-api-v2.service';

import { FitbitActivitySummary, FitbitActivityDistance } from '../interfaces/fitbit-activity-summary.interface';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';


@Injectable()
export class FitbitActivitySummaryService extends BaseDataService<FitbitActivitySummary> {

  constructor(hat: HatApiV2Service, userSvc: UserService) {
    super(hat, userSvc, 'fitbit', 'activity/day/summary', 'summaryDate');
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

import { Injectable } from '@angular/core';

import { Fitbit } from './fitbit.interface';
import { MockFitbitData } from './mock-data';

import * as moment from 'moment';
import { BaseDataService } from '../services/base-data.service';
import { UiStateService } from '../services/ui-state.service';
import { HatApiService } from '../services/hat-api.service';


@Injectable()
export class FitbitService extends BaseDataService<Fitbit> {

  constructor(hat: HatApiService, uiSvc: UiStateService) {
    super(hat, uiSvc);

    // enable and adjust the following when data plug connected
    // this.ensureTableExists('fitbits', 'fitbit');

    // remove the following when real data is available
    // this.pushMockDataToStream( MockFitbitData );
  }

  // this will need to be updated when data plug connected
  mapData(rawFitbit: any): Fitbit {
    console.log('fitbit', rawFitbit);
    const fitbitContent = rawFitbit;

    const fitbit: Fitbit = {
      dateTime: moment(fitbitContent.dateTime, 'YYYY-MM-DD').toString(),
      steps: fitbitContent.steps,
      restingHeartRate: fitbitContent.restingHeartRate,
      sleep: fitbitContent.sleep
    };

    return fitbit;
  }

}

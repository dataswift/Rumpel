import { Injectable } from '@angular/core';

import { Monzo } from './monzo.interface';
import { MockMonzoData } from './mock-data';

import * as moment from 'moment';
import { BaseDataService } from '../services/base-data.service';
import { UiStateService } from '../services/ui-state.service';
import { HatApiService } from '../services/hat-api.service';

@Injectable()
export class MonzoService extends BaseDataService<Monzo> {

  constructor(hat: HatApiService, uiSvc: UiStateService) {
    super(hat, uiSvc);

    // enable and adjust the following when data plug connected
    // this.ensureTableExists('monzos', 'monzo');

    // remove the following when real data is available
    // this.pushMockDataToStream( MockMonzoData );
  }

  // this will need to be updated when data plug connected
  mapData(rawMonzo: any): Monzo {
    console.log('monzo', rawMonzo);
    const monzoContent = rawMonzo;

    const monzo: Monzo = {
      dateTime: moment(monzoContent.dateTime, 'YYYY-MM-DDThh:mm:ssZ').toString(),
      balance: monzoContent.balance,
      currency: monzoContent.currency,
      spend_today: monzoContent.spend_today
    };

    return monzo;
  }

}

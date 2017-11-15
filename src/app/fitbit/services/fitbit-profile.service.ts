import { Injectable } from '@angular/core';
import {BaseDataService} from '../../services/base-data.service';
import {FitbitProfile} from '../interfaces/fitbit-profile.interface';
import {HatApiV2Service} from '../../services/hat-api-v2.service';
import {UiStateService} from '../../services/ui-state.service';
import {HatRecord} from '../../shared/interfaces/hat-record.interface';

@Injectable()
export class FitbitProfileService extends BaseDataService<FitbitProfile> {

  constructor(hat: HatApiV2Service, uiSvc: UiStateService) {
    super(hat, uiSvc, 'fitbit', 'profile', 'dateCreated')
  }

  coerceType(rawFitbit: HatRecord<any>): HatRecord<FitbitProfile> {
    return {
      endpoint: rawFitbit.endpoint,
      recordId: rawFitbit.recordId,
      data: <FitbitProfile>rawFitbit.data
    }
  }
}

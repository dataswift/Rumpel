import { Injectable } from '@angular/core';

import { BaseDataService } from '../../services/base-data.service';
import { HatApiService } from '../../services/hat-api.service';
import { UserService } from '../../user/user.service';

import { HatRecord } from '../../shared/interfaces/hat-record.interface';
import { FitbitProfile } from '../interfaces/fitbit-profile.interface';

@Injectable()
export class FitbitProfileService extends BaseDataService<FitbitProfile> {

  constructor(hat: HatApiService, userSvc: UserService) {
    super(hat, userSvc, 'fitbit', 'profile', 'dateCreated')
  }

  coerceType(rawFitbit: HatRecord<any>): HatRecord<FitbitProfile> {
    return {
      endpoint: rawFitbit.endpoint,
      recordId: rawFitbit.recordId,
      data: <FitbitProfile>rawFitbit.data
    }
  }
}

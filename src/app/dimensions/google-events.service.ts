/*
 * Copyright (C) 2017 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 1, 2017
 */

import { Injectable } from '@angular/core';
import { HatApiService } from '../core/services/hat-api.service';
import { AuthService } from '../core/services/auth.service';
import { BaseDataService } from '../services/base-data.service';

import { Event } from '../shared/interfaces/index';
import { HatRecord } from '../shared/interfaces/hat-record.interface';
import * as moment from 'moment';




@Injectable()
export class GoogleEventsService extends BaseDataService<Event> {

  constructor(hatSvc: HatApiService, authSvc: AuthService) {
    super(hatSvc, authSvc, 'google', 'events', 'changeme');
  }

  coerceType(rawEvent: HatRecord<any>): HatRecord<Event> {
    const eventContent = rawEvent.data;

    return {
      endpoint: rawEvent.endpoint,
      recordId: rawEvent.recordId,
      data: {
        id: eventContent.id,
        calendarName: 'google',
        title: eventContent.summary,
        description: eventContent.description,
        start: moment(eventContent.start.dateTime || eventContent.start.date),
        end: eventContent.end ? moment(eventContent.end.dateTime || eventContent.end.date) : null,
        allDay: !!(eventContent.end && eventContent.end.date),
        link: eventContent.htmlLink
      }
    };
  }
}

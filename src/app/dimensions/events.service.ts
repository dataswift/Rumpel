/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org>
 */

import { Injectable } from '@angular/core';
import { HatApiService } from '../services/hat-api.service';
import {BaseDataService} from '../services/base-data.service';
import {UiStateService} from '../services/ui-state.service';

import { Event } from '../shared/interfaces';
import * as moment from 'moment';

const DATE_REGEX = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;

@Injectable()
export class EventsService extends BaseDataService<Event> {

  constructor(hatSvc: HatApiService, uiSvc: UiStateService) {
    super(hatSvc, uiSvc);

    this.ensureTableExists('events', 'ical');
  }

  mapData(rawEvent: any): Event {
    const eventContent = rawEvent.data.events;

    return {
      title: eventContent.summary,
      description: eventContent.description,
      start: moment(eventContent.startDate),
      end: eventContent.endDate ? moment(eventContent.endDate) : null,
      allDay: false,
      calendarName: eventContent.calendarName
    };
  }
}

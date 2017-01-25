/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 1, 2017
 */

import { Injectable } from '@angular/core';
import {HatApiService} from "../services/hat-api.service";
import {UiStateService} from "../services/ui-state.service";
import {BaseDataService} from "../services/base-data.service";

import { Event } from '../shared/interfaces/index';
import * as moment from "moment";

@Injectable()
export class GoogleEventsService extends BaseDataService<Event> {

  constructor(hatSvc: HatApiService, uiSvc: UiStateService) {
    super(hatSvc, uiSvc);

    this.ensureTableExists("events", "google");
  }

  mapData(rawEvent: any): Event {
    const eventContent = rawEvent.data.events;

    return {
      id: eventContent.id,
      calendarName: 'google',
      title: eventContent.summary,
      description: eventContent.description,
      start: moment(eventContent.start.dateTime || eventContent.start.date),
      end: eventContent.end ? moment(eventContent.end.dateTime || eventContent.end.date) : null,
      allDay: !!(eventContent.end && eventContent.end.date),
      link: eventContent.htmlLink
    };
  }
}

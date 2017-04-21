/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 1, 2017
 */

import { Injectable } from '@angular/core';
import {BaseDataService} from '../services/base-data.service';
import {HatApiService} from '../services/hat-api.service';
import {UiStateService} from '../services/ui-state.service';

import { Event } from '../shared/interfaces/index';
import * as moment from 'moment';

@Injectable()
export class FacebookEventsService extends BaseDataService<Event> {

  constructor(hatSvc: HatApiService, uiSvc: UiStateService) {
    super(hatSvc, uiSvc);

    this.ensureTableExists('events', 'facebook');
  }

  mapData(rawEvent: any): Event {
    const eventContent = rawEvent.data.events;

    const event: Event = {
      id: eventContent.id,
      title: eventContent.name,
      description: eventContent.description,
      start: moment(eventContent.start_time),
      end: eventContent.end_time ? moment(eventContent.end_time) : null,
      allDay: false,
      calendarName: 'facebook'
    };

    if (eventContent.place && eventContent.place.location) {
      event['location'] = {
        latitude: eventContent.place.location.latitude,
        longitude: eventContent.place.location.longitude
      };
    }

    return event;
  }

}

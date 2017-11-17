/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 1, 2017
 */

import { Injectable } from '@angular/core';
import { BaseDataService } from '../services/base-data.service';
import { HatApiV2Service } from '../services/hat-api-v2.service';
import { UserService } from '../user/user.service';

import { Event } from '../shared/interfaces/index';
import { HatRecord } from '../shared/interfaces/hat-record.interface';
import * as moment from 'moment';


@Injectable()
export class FacebookEventsService extends BaseDataService<Event> {

  constructor(hat: HatApiV2Service, userSvc: UserService) {
    super(hat, userSvc, 'facebook', 'events', 'updated_time');
  }

  coerceType(rawEvent: HatRecord<any>): HatRecord<Event> {
    const eventContent = rawEvent.data;

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

    return {
      endpoint: rawEvent.endpoint,
      recordId: rawEvent.recordId,
      data: event
    };
  }

}

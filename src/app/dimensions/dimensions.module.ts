/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org>
 */

import { NgModule } from '@angular/core';

import { DimensionsRoutingModule } from './dimensions.routing';
import { SharedModule } from '../shared/shared.module';

import { CalendarComponent } from './calendar/calendar.component';
import { TileCalendarComponent } from './tile-calendar/tile-calendar.component';

import { EventsService } from './events.service';
import { FacebookEventsService } from './facebook-events.service';
import { GoogleEventsService } from './google-events.service';

@NgModule({
    imports: [ SharedModule, DimensionsRoutingModule ],
    declarations: [ CalendarComponent, TileCalendarComponent ],
    providers: [ EventsService, FacebookEventsService, GoogleEventsService ],
    exports: [ TileCalendarComponent ]
})
export class DimensionsModule {}

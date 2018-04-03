/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org>
 */

import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { FacebookEventsService } from './facebook-events.service';
import { GoogleEventsService } from './google-events.service';

@NgModule({
    imports: [ SharedModule ],
    declarations: [ ],
    providers: [ FacebookEventsService, GoogleEventsService ],
    exports: [  ]
})
export class DimensionsModule {}

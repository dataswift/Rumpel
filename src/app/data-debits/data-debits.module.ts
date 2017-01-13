/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org>
 */

import { NgModule } from '@angular/core';

import { DataDebitsRoutingModule } from './data-debits.routing';
import { SharedModule } from '../shared/shared.module';

import { DataDebitConfirmComponent } from './data-debit-confirm/data-debit-confirm.component';
import { TileDataDebitComponent } from './tile-data-debit/tile-data-debit.component';

import { DataDebitService } from './data-debits.service';

@NgModule({
    imports: [ SharedModule, DataDebitsRoutingModule ],
    declarations: [ DataDebitConfirmComponent, TileDataDebitComponent ],
    providers: [ DataDebitService ],
    exports: [ TileDataDebitComponent ]
})
export class DataDebitsModule {}

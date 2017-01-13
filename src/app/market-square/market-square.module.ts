/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { TileDataOffersComponent } from './tile-data-offers/tile-data-offers.component';
import { TileDataPlugsComponent } from './tile-data-plugs/tile-data-plugs.component';

import { MarketSquareService } from './market-square.service';

@NgModule({
    imports: [ SharedModule ],
    declarations: [ TileDataOffersComponent, TileDataPlugsComponent ],
    providers: [ MarketSquareService ],
    exports: [ TileDataOffersComponent, TileDataPlugsComponent ]
})
export class MarketSquareModule {}

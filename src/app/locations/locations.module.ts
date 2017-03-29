/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { NgModule } from '@angular/core';

import { LocationsRoutingModule } from './locations-routing.module';
import { SharedModule } from '../shared/shared.module';

import { LocationsComponent } from './locations/locations.component';
import { MapComponent } from './map/map.component';
import { TileMapComponent } from './tile-map/tile-map.component';

import { LocationsService } from './locations.service';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [ SharedModule, LocationsRoutingModule, FormsModule ],
    declarations: [ LocationsComponent, MapComponent, TileMapComponent ],
    providers: [ LocationsService ],
    exports: [ TileMapComponent, MapComponent ]
})
export class LocationsModule {}

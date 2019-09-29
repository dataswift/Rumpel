/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 2016
 */

import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { MapComponent } from './map/map.component';
import { TileMapComponent } from './tile-map/tile-map.component';

import { LocationsService } from './locations.service';
import { FormsModule } from '@angular/forms';
import { CustomAngularMaterialModule } from '../core/custom-angular-material.module';

@NgModule({
    imports: [ SharedModule, FormsModule, CustomAngularMaterialModule ],
    declarations: [ MapComponent, TileMapComponent ],
    providers: [ LocationsService ],
    exports: [ TileMapComponent, MapComponent ]
})
export class LocationsModule {}

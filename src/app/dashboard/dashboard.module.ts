/*
 * Copyright (C) 2017 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 2017
 */

import { NgModule } from '@angular/core';

import { LocationsModule } from '../locations/locations.module';
import { SharedModule } from '../shared/shared.module';
import { SocialModule } from '../social/social.module';
import { FitbitModule } from '../fitbit/fitbit.module';
import { MonzoModule } from '../monzo/monzo.module';
import { NotablesModule } from '../notables/notables.module';
import { ProfilesModule } from '../profiles/profiles.module';

import { GridComponent } from './grid/grid.component';
import { AccountStatusTileComponent } from './account-status-tile/account-status-tile.component';
import { TileHeaderComponent } from './tile-header/tile-header.component';
import { TileWeatherComponent } from './tile-weather/tile-weather.component';
import { TileDataDebitComponent } from './tile-data-debit/tile-data-debit.component';

import { WeatherService } from './weather.service';
import { DataDebitService } from './data-debits.service';
import { TileComingSoonComponent } from './tile-coming-soon/tile-coming-soon.component';
import { CustomAngularMaterialModule } from '../core/custom-angular-material.module';

@NgModule({
  imports: [
    SharedModule,
    LocationsModule,
    SocialModule,
    FitbitModule,
    MonzoModule,
    NotablesModule,
    ProfilesModule,
    CustomAngularMaterialModule
  ],
  declarations: [
    GridComponent,
    TileComingSoonComponent,
    TileHeaderComponent,
    TileWeatherComponent,
    TileDataDebitComponent,
    AccountStatusTileComponent
  ],
  providers: [ WeatherService, DataDebitService ]
})
export class DashboardModule {}

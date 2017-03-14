/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 1, 2017
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRootComponent } from './app.component';

import { APP_CONFIG, AppConfig } from './app.config';

import { LayoutModule } from './layout/layout.module';
import { MashupsModule } from './mashups/mashups.module';
import { NotablesModule } from './notables/notables.module';
import { DimensionsModule } from './dimensions/dimensions.module';
import { ProfilesModule } from './profiles/profiles.module';
import { SharedModule } from './shared/shared.module';
import { LocationsModule } from './locations/locations.module';
import { PhotosModule } from './photos/photos.module';
import { SocialModule } from './social/social.module';
import { MarketSquareModule } from './market-square/market-square.module';
import { DataDebitsModule } from './data-debits/data-debits.module';
import { WeatherModule } from './weather/weather.module';
import { PublicPagesModule } from './public-pages/public-pages.module';

import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth.guard';

import { DataTypeFilterPipe } from './pipes';
import { GridComponent, TileHeaderComponent, TileComingSoonComponent} from './dashboard';
import { UserService, HatApiService, UiStateService, RumpelService, DataPlugService } from './services/index';

/* MODAL COMPONENTS */

import { ConfirmBoxComponent } from "./layout/confirm-box/confirm-box.component";
import { DialogBoxComponent } from './layout/dialog-box/dialog-box.component';
import { InfoBoxComponent } from "./layout/info-box/info-box.component";

import { CookieService } from 'angular2-cookie/core';
import { cookieServiceFactory } from './aot-workaround';
import { UserModule } from "./user/user.module";

@NgModule({
  declarations: [
    AppRootComponent,
    GridComponent,
    TileHeaderComponent,
    TileComingSoonComponent,
    DataTypeFilterPipe
  ],
  imports: [
    BrowserModule,
    SharedModule,
    LocationsModule,
    HttpModule,
    PhotosModule,
    FormsModule,
    AppRoutingModule,
    LayoutModule,
    UserModule,
    SocialModule,
    MarketSquareModule,
    DataDebitsModule,
    MashupsModule,
    NotablesModule,
    DimensionsModule,
    ProfilesModule,
    WeatherModule,
    PublicPagesModule
  ],
  bootstrap: [ AppRootComponent ],
  entryComponents: [ DialogBoxComponent, ConfirmBoxComponent, InfoBoxComponent ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: APP_CONFIG, useValue: AppConfig },
    { provide: CookieService, useFactory: cookieServiceFactory },
    AuthGuard,
    UserService,
    HatApiService,
    UiStateService,
    RumpelService,
    DataPlugService
  ]
})
export class AppRootModule {}

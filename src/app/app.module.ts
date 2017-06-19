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

import {APP_CONFIG, AppConfig, IAppConfig} from './app.config';

import { LayoutModule } from './layout/layout.module';
import { MashupsModule } from './mashups/mashups.module';
import { NotablesModule } from './notables/notables.module';
import { DataManagementModule } from './data-management/data-management.module';
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

import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth.guard';
import { NativeGuard } from './native-guard.service';

import { DataTypeFilterPipe } from './pipes';
import { GridComponent, TileHeaderComponent, TileHeroComponent, TileComingSoonComponent} from './dashboard';
import { HatApiService, UiStateService, RumpelService } from './services/index';
import { AuthHttp } from './services/auth-http.service';

import { DatePickerModule } from 'ng2-datepicker';

/* MODAL COMPONENTS */

import { ConfirmBoxComponent } from './layout/confirm-box/confirm-box.component';
import { DialogBoxComponent } from './layout/dialog-box/dialog-box.component';
import { InfoBoxComponent } from './layout/info-box/info-box.component';

import { CookieService } from 'angular2-cookie/core';
import { UserModule } from './user/user.module';
import { BrowserStorageService } from './services/browser-storage.service';
import { OffersComponent } from './offers/offers.component';

export function authHttpFactory(backend: XHRBackend,
                                defaultOptions: RequestOptions,
                                storageSvc: BrowserStorageService,
                                config: IAppConfig) {
  return new AuthHttp(backend, defaultOptions, storageSvc, config);
}

export function cookieServiceFactory() {
  return new CookieService();
}

@NgModule({
  declarations: [
    AppRootComponent,
    GridComponent,
    TileHeaderComponent,
    TileHeroComponent,
    TileComingSoonComponent,
    DataTypeFilterPipe,
    OffersComponent
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
    DataManagementModule,
    DataDebitsModule,
    MashupsModule,
    NotablesModule,
    DimensionsModule,
    ProfilesModule,
    WeatherModule,
    PublicPagesModule,
    DatePickerModule
  ],
  bootstrap: [ AppRootComponent ],
  entryComponents: [ DialogBoxComponent, ConfirmBoxComponent, InfoBoxComponent ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: APP_CONFIG, useValue: AppConfig },
    { provide: CookieService, useFactory: cookieServiceFactory },
    {
      provide: AuthHttp,
      useFactory: authHttpFactory,
      deps: [ XHRBackend, RequestOptions, BrowserStorageService, APP_CONFIG ]
    },
    AuthGuard,
    NativeGuard,
    HatApiService,
    UiStateService,
    RumpelService,
    BrowserStorageService
  ]
})
export class AppRootModule {}

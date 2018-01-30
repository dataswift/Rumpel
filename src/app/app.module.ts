/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 1, 2017
 */

import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRootComponent } from './app.component';

import { APP_CONFIG, AppConfig, configuration } from './app.config';

import { CoreModule } from './core/core.module';
import { DataManagementModule } from './data-management/data-management.module';
import { SharedModule } from './shared/shared.module';
import { LocationsModule } from './locations/locations.module';
import { SocialModule } from './social/social.module';
import { FitbitModule } from './fitbit/fitbit.module';
import { MonzoModule } from './monzo/monzo.module';
import { PublicPagesModule } from './public-pages/public-pages.module';
import { OffersModule } from './offers/offers.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { NotablesModule } from './notables/notables.module';
import { MashupsModule } from './mashups/mashups.module';

import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth.guard';
import { NativeGuard } from './native-guard.service';

import { DataTypeFilterPipe } from './pipes';
import { HatApiService, RumpelService } from './services/index';
import { AuthHttp } from './services/auth-http.service';

// import { DatePickerModule } from 'ng2-datepicker';

/* MODAL COMPONENTS */

import { ConfirmBoxComponent } from './core/confirm-box/confirm-box.component';
import { DialogBoxComponent } from './core/dialog-box/dialog-box.component';
import { InfoBoxComponent } from './core/info-box/info-box.component';
import { MapBoxComponent } from './core/map-box/map-box.component';
import { FileUploadComponent } from './core/file-upload/file-upload.component';

import { CookieService } from 'angular2-cookie/core';
import { UserModule } from './user/user.module';
import { BrowserStorageService } from './services/browser-storage.service';
import { HatApiV2Service } from './services/hat-api-v2.service';
import { GlobalMessagingService } from './services/global-messaging.service';
import { DexApiService } from './services/dex-api.service';
import { FileService } from './services/file.service';
import { StaticDataService } from './services/static-data.service';
import { Router } from '@angular/router';

export function authHttpFactory(backend: XHRBackend,
                                defaultOptions: RequestOptions,
                                router: Router,
                                storageSvc: BrowserStorageService,
                                config: AppConfig) {
  return new AuthHttp(backend, defaultOptions, router, storageSvc, config);
}

export function cookieServiceFactory() {
  return new CookieService();
}

@NgModule({
  declarations: [
    AppRootComponent,
    DataTypeFilterPipe
  ],
  imports: [
    NoopAnimationsModule, // Using NoopAnimationModule instead of BrowserModule to prevent double-import error
    SharedModule,
    LocationsModule,
    HttpModule,
    FormsModule,
    UserModule,
    SocialModule,
    FitbitModule,
    MonzoModule,
    DataManagementModule,
    PublicPagesModule,
    OffersModule,
    DashboardModule,
    NotablesModule,
    MashupsModule,
    CoreModule,
    AppRoutingModule
  ],
  bootstrap: [ AppRootComponent ],
  entryComponents: [ DialogBoxComponent, ConfirmBoxComponent, InfoBoxComponent, MapBoxComponent, FileUploadComponent ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: APP_CONFIG, useValue: configuration },
    { provide: CookieService, useFactory: cookieServiceFactory },
    {
      provide: AuthHttp,
      useFactory: authHttpFactory,
      deps: [ XHRBackend, RequestOptions, Router, BrowserStorageService, APP_CONFIG ]
    },
    AuthGuard,
    NativeGuard,
    HatApiService,
    HatApiV2Service, // Supersedes original HAT API service
    StaticDataService,
    GlobalMessagingService,
    DexApiService,
    FileService,
    RumpelService,
    BrowserStorageService
  ]
})
export class AppRootModule {}

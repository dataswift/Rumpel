/*
 * Copyright (C) 2017 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 1, 2017
 */

import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRootComponent } from './app.component';

import { APP_CONFIG, configuration } from './app.config';

import { CoreModule } from './core/core.module';
import { DataManagementModule } from './data-management/data-management.module';
import { SharedModule } from './shared/shared.module';
import { LocationsModule } from './locations/locations.module';
import { PublicPagesModule } from './public-pages/public-pages.module';
import { NotablesModule } from './notables/notables.module';
import { MashupsModule } from './mashups/mashups.module';
import { SettingsModule } from './settings/settings.module';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth.guard';
import { NativeGuard } from './native-guard.service';

import { DataTypeFilterPipe } from './pipes';

/* MODAL COMPONENTS */

import { ConfirmBoxComponent } from './core/confirm-box/confirm-box.component';
import { DialogBoxComponent } from './core/dialog-box/dialog-box.component';
import { InfoBoxComponent } from './core/info-box/info-box.component';
import { MapBoxComponent } from './core/map-box/map-box.component';
import { FileUploadComponent } from './core/file-upload/file-upload.component';

import { UserModule } from './user/user.module';
import { BrowserStorageService } from './services/browser-storage.service';
import { HatApiService } from './core/services/hat-api.service';
import { GlobalMessagingService } from './services/global-messaging.service';
import { DexApiService } from './services/dex-api.service';
import { FileService } from './services/file.service';
import { StaticDataService } from './services/static-data.service';
import { ExploreModule } from './explore/explore.module';
import { AuthInterceptor } from './core/services/auth-interceptor';
import { SheModule } from './she/she.module';
import { SystemStatusService } from './services/system-status.service';
import { WINDOW_PROVIDERS } from './core/services/global.service';
import { ToolsModule } from './tools/tools.module';
import { ReactiveWebStorageModule } from './core/services/reactive-webstorage.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { CookieService } from 'ngx-cookie-service';
import { HmiModule } from './hmi/hmi.module';
import { RedirectGuard } from './redirect.guard';


export const storageKeys = ['system-status', 'applications', 'tools', 'phata-structure'];


@NgModule({
  declarations: [
    AppRootComponent,
    DataTypeFilterPipe
  ],
  imports: [
    NoopAnimationsModule, // Using NoopAnimationModule instead of BrowserModule to prevent double-import error
    HttpClientModule,
    SharedModule,
    LocationsModule,
    FormsModule,
    UserModule,
    DataManagementModule,
    PublicPagesModule,
    NotablesModule,
    MashupsModule,
    ExploreModule,
    SheModule,
    CoreModule,
    AppRoutingModule,
    SettingsModule,
    ToolsModule,
    HmiModule,
    ReactiveWebStorageModule.setLocalStorageKeys(storageKeys),
    NgxDaterangepickerMd.forRoot()
  ],
  bootstrap: [ AppRootComponent ],
  entryComponents: [ DialogBoxComponent, ConfirmBoxComponent, InfoBoxComponent, MapBoxComponent, FileUploadComponent,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: APP_CONFIG, useValue: configuration },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    NativeGuard,
    RedirectGuard,
    CookieService,
    HatApiService, // Supersedes original HAT API service
    StaticDataService,
    SystemStatusService,
    GlobalMessagingService,
    DexApiService,
    FileService,
    BrowserStorageService,
    WINDOW_PROVIDERS
  ]
})
export class AppRootModule {}

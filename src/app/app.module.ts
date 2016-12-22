import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRootComponent } from './app.component';

import { APP_CONFIG, AppConfig } from './app.config';

import { DialogBoxComponent } from './layout/dialog-box/dialog-box.component';

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

import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth.guard';

import { DataTypeFilterPipe } from './pipes';
import { LoginComponent, AuthComponent } from './user-mgmt';
import { GridComponent, TileHeaderComponent, TileComingSoonComponent} from './dashboard'
import { AuthService, HatApiService, UiStateService, RumpelService, DataPlugService, NotificationsService, MediaService } from './services';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import {ConfirmBoxComponent} from "./layout/confirm-box/confirm-box.component";

@NgModule({
  declarations: [
    AppRootComponent,
    LoginComponent,
    AuthComponent,
    GridComponent,
    TileHeaderComponent,
    TileComingSoonComponent,
    DataTypeFilterPipe,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    LocationsModule,
    HttpModule,
    PhotosModule,
    FormsModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    LayoutModule,
    SocialModule,
    MarketSquareModule,
    DataDebitsModule,
    MashupsModule,
    NotablesModule,
    DimensionsModule,
    ProfilesModule,
    WeatherModule
  ],
  bootstrap: [ AppRootComponent ],
  entryComponents: [ DialogBoxComponent, ConfirmBoxComponent ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: APP_CONFIG, useValue: AppConfig },
    AuthGuard,
    AuthService,
    HatApiService,
    UiStateService,
    RumpelService,
    DataPlugService,
    NotificationsService,
    MediaService
  ]
})
export class AppRootModule {}
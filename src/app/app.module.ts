import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRootComponent } from './app.component';

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
import { LoginComponent } from './user-mgmt';
import { GridComponent, TileHeaderComponent, TileComingSoonComponent} from './dashboard'
import { HatApiService, UiStateService, RumpelService, DataPlugService, UserService } from './services';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

@NgModule({
  declarations: [
    AppRootComponent,
    LoginComponent,
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
  bootstrap: [AppRootComponent],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthGuard,
    UserService,
    HatApiService,
    UiStateService,
    RumpelService,
    DataPlugService
  ]
})
export class AppRootModule {}
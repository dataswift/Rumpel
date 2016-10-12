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
import { SocialModule } from './social/social.module';
import { MarketSquareModule } from './market-square/market-square.module';
import { DataDebitsModule } from './data-debits/data-debits.module';

import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { AuthGuard } from './auth.guard';

import { GridComponent } from './dashboard';
import { DataTypeFilterPipe } from './pipes';
import { TileWeatherComponent, TileHeaderComponent, TileComingSoonComponent } from './dashboard';
import { PhotoGridComponent, PhotosComponent } from './dataViews';
import { LoginComponent, AuthComponent } from './user-mgmt';
import { AuthService, HatApiService, ImagesService, UiStateService, RumpelService } from './services';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

@NgModule({
  declarations: [
    AppRootComponent,
    GridComponent,
    LoginComponent,
    AuthComponent,
    PhotoGridComponent,
    PhotosComponent,
    TileWeatherComponent,
    TileHeaderComponent,
    TileComingSoonComponent,

    DataTypeFilterPipe
  ],
  imports: [
    BrowserModule,
    SharedModule,
    LocationsModule,
    HttpModule,
    FormsModule,
    routing,
    ModalModule.forRoot(),
    BootstrapModalModule,
    LayoutModule,
    SocialModule,
    MarketSquareModule,
    DataDebitsModule,
    MashupsModule,
    NotablesModule,
    DimensionsModule,
    ProfilesModule
  ],
  bootstrap: [AppRootComponent],
  providers: [
    appRoutingProviders,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthGuard,
    AuthService,
    HatApiService,
    ImagesService,
    UiStateService,
    RumpelService
  ]
})
export class AppRootModule {}
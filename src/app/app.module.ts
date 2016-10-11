import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRootComponent } from './app.component';

import { LayoutModule } from './layout/layout.module';
import { NotablesModule } from './notables/notables.module';
import { ProfilesModule } from './profiles/profiles.module';
import { SharedModule } from './shared/shared.module';
import { LocationsModule } from './locations/locations.module';
import { SocialModule } from './social/social.module';
import { MarketSquareModule } from './market-square/market-square.module';

import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { AuthGuard } from './auth.guard';

import { GridComponent } from './dashboard';
import { DataDebitConfirmComponent } from './transactions';
import { TimeFilterPipe, LocationFilterPipe, DataTypeFilterPipe, LimitMembersPipe } from './pipes';
import { TileCalendarComponent, TileWeatherComponent, TileHeaderComponent, TileComingSoonComponent, TileDataDebitComponent } from './dashboard';
import { DataPointComponent, PhotoGridComponent, ViewByDayComponent, TimelineComponent, CalendarComponent, PhotosComponent, MixpadComponent } from './dataViews';
import { LoginComponent, AuthComponent } from './user-mgmt';
import { AuthService, HatApiService, EventsService, ImagesService, DataDebitService, UiStateService, RumpelService } from './services';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

@NgModule({
  declarations: [
    AppRootComponent,
    GridComponent,
    LoginComponent,
    AuthComponent,
    DataPointComponent,
    PhotoGridComponent,
    ViewByDayComponent,
    TimelineComponent,
    MixpadComponent,
    PhotosComponent,
    CalendarComponent,
    DataDebitConfirmComponent,
    TileCalendarComponent,
    TileWeatherComponent,
    TileHeaderComponent,
    TileComingSoonComponent,
    TileDataDebitComponent,

    TimeFilterPipe,
    LocationFilterPipe,
    DataTypeFilterPipe,
    LimitMembersPipe
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
    NotablesModule,
    ProfilesModule
  ],
  bootstrap: [AppRootComponent],
  providers: [
    appRoutingProviders,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthGuard,
    AuthService,
    HatApiService,
    EventsService,
    ImagesService,
    DataDebitService,
    UiStateService,
    RumpelService
  ]
})
export class AppRootModule {}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRootComponent } from './app.component';

import { LayoutModule } from './layout/layout.module';
import { NotablesModule } from './notables/notables.module';
import { SharedModule } from './shared/shared.module';
import { LocationsModule } from './locations/locations.module';

import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { AuthGuard } from './auth.guard';

import { GridComponent } from './dashboard';
import { DataDebitConfirmComponent } from './transactions';
import { TimeFilterPipe, LocationFilterPipe, DataTypeFilterPipe, ReplaceCharsPipe, LimitMembersPipe, LimitContentPipe } from './pipes';
import { TileProfileComponent, TileCalendarComponent, TileSocialComponent, TileWeatherComponent, TileHeaderComponent, TileDataOffersComponent, TileDataPlugsComponent, TileComingSoonComponent, TileDataDebitComponent } from './dashboard';
import { DataPointComponent, FbPostComponent, PhotoGridComponent, ViewByDayComponent, TimelineComponent, ProfileComponent, SocialComponent, CalendarComponent, PhotosComponent, MixpadComponent } from './dataViews';
import { LoginComponent, AuthComponent } from './user-mgmt';
import { AuthService, HatApiService, MarketSquareService, EventsService, ImagesService, SocialService, DataDebitService, ProfileService, UiStateService, RumpelService } from './services';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

@NgModule({
  declarations: [
    AppRootComponent,
    GridComponent,
    LoginComponent,
    AuthComponent,
    DataPointComponent,
    FbPostComponent,
    PhotoGridComponent,
    ViewByDayComponent,
    TimelineComponent,
    MixpadComponent,
    ProfileComponent,
    PhotosComponent,
    CalendarComponent,
    SocialComponent,
    DataDebitConfirmComponent,
    TileProfileComponent,
    TileCalendarComponent,
    TileSocialComponent,
    TileWeatherComponent,
    TileHeaderComponent,
    TileDataOffersComponent,
    TileDataPlugsComponent,
    TileComingSoonComponent,
    TileDataDebitComponent,

    TimeFilterPipe,
    LocationFilterPipe,
    DataTypeFilterPipe,
    ReplaceCharsPipe,
    LimitMembersPipe,
    LimitContentPipe
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
    NotablesModule
  ],
  bootstrap: [AppRootComponent],
  providers: [
    appRoutingProviders,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthGuard,
    AuthService,
    HatApiService,
    MarketSquareService,
    EventsService,
    ImagesService,
    SocialService,
    DataDebitService,
    ProfileService,
    UiStateService,
    RumpelService
  ]
})
export class AppRootModule {}
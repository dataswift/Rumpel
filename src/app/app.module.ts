import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRootComponent } from './app.component';

import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routing, appRoutingProviders } from './app.routing';
import { AuthGuard } from './auth.guard';

import { HeaderComponent } from './header';
import { FooterComponent } from './footer';
import { SideMenuComponent } from './side-menu';
import { GridComponent } from './dashboard';
import { AboutComponent } from './about';
import { DataDebitConfirmComponent } from './transactions';
import { Moment, WithObjectPipe, TimeFilterPipe, LocationFilterPipe, DataTypeFilterPipe, ReplaceCharsPipe, LimitMembersPipe, LimitContentPipe } from './pipes';
import { OutsideClick } from './shared/outside-click.directive';
import { SwitchComponent, NotesInputComponent } from './shared/components';
import { TileProfileComponent, TileCalendarComponent, TileSocialComponent, TileWeatherComponent, TileHeaderComponent, TileDataOffersComponent, TileDataPlugsComponent, TileMapComponent, TileInfoComponent, TileComingSoonComponent, TileDataDebitComponent, TileNotesComponent } from './dashboard';
import { DataPointComponent, FbPostComponent, PhotoGridComponent, ViewByDayComponent, TimelineComponent, MapComponent, ProfileComponent, SocialComponent, LocationsComponent, CalendarComponent, PhotosComponent, MixpadComponent } from './dataViews';
import { LoginComponent, AuthComponent } from './user-mgmt';
import { AuthService, HatApiService, MarketSquareService, LocationsService, EventsService, ImagesService, SocialService, DataDebitService, ProfileService, UiStateService, RumpelService } from './services';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

@NgModule({
  declarations: [
    AppRootComponent,
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    GridComponent,
    AboutComponent,
    LoginComponent,
    AuthComponent,
    DataPointComponent,
    FbPostComponent,
    SwitchComponent,
    PhotoGridComponent,
    ViewByDayComponent,
    TimelineComponent,
    MapComponent,
    MixpadComponent,
    ProfileComponent,
    PhotosComponent,
    CalendarComponent,
    LocationsComponent,
    SocialComponent,
    NotesInputComponent,
    DataDebitConfirmComponent,
    TileProfileComponent,
    TileCalendarComponent,
    TileSocialComponent,
    TileWeatherComponent,
    TileHeaderComponent,
    TileDataOffersComponent,
    TileDataPlugsComponent,
    TileMapComponent,
    TileInfoComponent,
    TileComingSoonComponent,
    TileDataDebitComponent,
    TileNotesComponent,

    OutsideClick,

    Moment,
    WithObjectPipe,
    TimeFilterPipe,
    LocationFilterPipe,
    DataTypeFilterPipe,
    ReplaceCharsPipe,
    LimitMembersPipe,
    LimitContentPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule,
    routing,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  bootstrap: [AppRootComponent],
  providers: [
    appRoutingProviders,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthGuard,
    AuthService,
    HatApiService,
    MarketSquareService,
    LocationsService,
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
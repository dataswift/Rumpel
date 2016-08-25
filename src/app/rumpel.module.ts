import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RumpelAppComponent } from './rumpel.component';

import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routing, rumpelRoutingProviders } from './rumpel.routing';
import { AuthGuard } from './auth.guard';
import { AuthService, HatApiService, MarketSquareService, LocationsService, EventsService, ImagesService, SocialService, DataDebitService, ProfileService, UiStateService, RumpelService } from './services';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

@NgModule({
  declarations: [
    RumpelAppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    FormsModule,
    routing,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  bootstrap: [RumpelAppComponent],
  providers: [
    rumpelRoutingProviders,
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
export class RumpelModule {}
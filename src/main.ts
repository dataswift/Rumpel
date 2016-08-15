import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { disableDeprecatedForms, provideForms} from '@angular/forms';
import { APP_ROUTER_PROVIDERS } from './app/rumpel.routes';
import { RumpelAppComponent, environment } from './app/';
import { AuthGuard } from './app/auth.guard';
import { DataGuard } from './app/data.guard';
import { AuthService, HatApiService, MarketSquareService, LocationsService, EventsService, ImagesService, SocialService, DataDebitService, ProfileService, UiStateService } from './app/services';

if (environment.production) {
  enableProdMode();
}

bootstrap(RumpelAppComponent, [
  APP_ROUTER_PROVIDERS,
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  HTTP_PROVIDERS,
  AuthGuard,
  DataGuard,
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
  disableDeprecatedForms(),
  provideForms()
])
  .catch(err => console.error(err));

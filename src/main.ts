import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { RumpelAppComponent, environment } from './app/';
import { APP_ROUTER_PROVIDERS } from './app/rumpel.routes';
import { AuthGuard } from './app/auth.guard';
import { AuthService, HatApiService, MarketSquareService, LocationsService, EventsService, ImagesService, SocialService, DataDebitService } from './app/services';

if (environment.production) {
  enableProdMode();
}

bootstrap(RumpelAppComponent, [
  APP_ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  AuthGuard,
  AuthService,
  HatApiService,
  MarketSquareService,
  LocationsService,
  EventsService,
  ImagesService,
  SocialService,
  DataDebitService
])
  .catch(err => console.error(err));

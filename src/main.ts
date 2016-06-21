import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { RumpelAppComponent, environment } from './app/';
import { APP_ROUTER_PROVIDERS } from './app/rumpel.routes';
import { AuthService, HatApiService, LocationsService, EventsService, ImagesService } from './app/services';

if (environment.production) {
  enableProdMode();
}

bootstrap(RumpelAppComponent, [
  APP_ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  AuthService,
  HatApiService,
  LocationsService,
  EventsService,
  ImagesService
])
  .catch(err => console.error(err));

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { RumpelAppComponent, environment } from './app/';
import { AuthService, LocationsService, EventsService, ImagesService } from './app/services';

if (environment.production) {
  enableProdMode();
}

bootstrap(RumpelAppComponent,
  [AuthService,
  LocationsService,
  EventsService,
  ImagesService,
  HTTP_PROVIDERS]);

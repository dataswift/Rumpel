import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms} from '@angular/forms';
import { APP_ROUTER_PROVIDERS } from './app/rumpel.routes';
import { RumpelAppComponent, environment } from './app/';
import { AuthGuard } from './app/auth.guard';
import { AuthService, HatApiService, MarketSquareService, LocationsService, EventsService, ImagesService, SocialService, DataDebitService, ProfileService } from './app/services';

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
  DataDebitService,
  ProfileService,
  disableDeprecatedForms(),
  provideForms()
])
  .catch(err => console.error(err));

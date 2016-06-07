import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { RumpelAppComponent, environment } from './app/';
import { AuthService } from './app/auth.service';
import { HTTP_PROVIDERS } from '@angular/http';

if (environment.production) {
  enableProdMode();
}

bootstrap(RumpelAppComponent, [AuthService, HTTP_PROVIDERS]);

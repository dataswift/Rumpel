import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { Rumpel2AppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(Rumpel2AppComponent);


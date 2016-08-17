import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RumpelModule } from './app/rumpel.module';
import { enableProdMode } from '@angular/core';
import { environment } from './app/';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(RumpelModule);

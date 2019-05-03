import { NgModule, ModuleWithProviders } from '@angular/core';
import { Store } from './store';
import { LocalStorageService } from './local-storage.service';
import { SessionStorageService } from './session-storage.service';
import { CacheService } from './cache.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [Store, LocalStorageService, SessionStorageService, CacheService]
})
export class ReactiveWebStorageModule {
  // tslint:disable-next-line:member-access
  static setLocalStorageKeys(keys?: string[]): ModuleWithProviders {
    return {
      ngModule: ReactiveWebStorageModule,
      providers: [{provide: 'localStoragekeys', useValue: keys}]
    };
  }
}

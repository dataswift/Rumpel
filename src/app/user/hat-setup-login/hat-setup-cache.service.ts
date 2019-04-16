import {HatApiService} from '../../core/services/hat-api.service';
import {Observable, of} from 'rxjs';
import {HatApplication} from '../../explore/hat-application.interface';
import {shareReplay} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class HatSetupCacheService {

  constructor(private hatSvc: HatApiService) {
  }

  getApplicationHmi(): Observable<HatApplication[]> {
    const parentApp: HatApplication[] = this.getParentApp();
    const dependencies: HatApplication[] = this.getDependencyApps() || [];
    let cachedApps: HatApplication[] = [];
    if (parentApp) {
      cachedApps = cachedApps.concat(parentApp);
    }
    if (dependencies) {
      cachedApps = cachedApps.concat(dependencies);
    }
    console.log('cachedApps', cachedApps);

    if (cachedApps.length > 0) {
      return of(cachedApps);
    }

    return this.hatSvc.getApplicationHmi();
  }

  setParentApp(value: HatApplication) {
    if (value) {
      this.storeApp('apps-parent', [value]);
    }
  }
  setDependencyApps(value: HatApplication[]) {
    if (value) {
      this.storeApp('apps-dependencies', value);
    }
  }
  getParentApp(): HatApplication[] {
    return this.getCachedApp('apps-parent');
  }
  getDependencyApps(): HatApplication[] {
    return this.getCachedApp('apps-dependencies');
  }

  refreshDependencyApp(newApp: HatApplication) {
    if (newApp) {
      const cachedDependencyApps = this.getDependencyApps();
      const newApps = cachedDependencyApps.map( app => {
        return app.application.id === newApp.application.id ? newApp : app;
      });
      this.setDependencyApps(newApps);
    }
  }

  storeApp(key: string, value: HatApplication[]) {
    if (key && value) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }

  getCachedApp(key: string): HatApplication[] {
    if (key) {
      return JSON.parse(window.localStorage.getItem(key));
    }
  }

}

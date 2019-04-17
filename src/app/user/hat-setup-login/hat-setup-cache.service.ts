import { HatApiService } from '../../core/services/hat-api.service';
import { HatApplication } from '../../explore/hat-application.interface';
import { Injectable } from '@angular/core';
import { addMinutes, isFuture } from 'date-fns';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';

interface HatCacheApplication {
  app: HatApplication,
  date: Date
}

@Injectable()
export class HatSetupCacheService {
  applicationPrefix = 'app-';

  constructor(private hatSvc: HatApiService) {
  }

  private setApp(key: string, value: HatCacheApplication) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  private getApp(key: string): HatCacheApplication {
    return JSON.parse(window.localStorage.getItem(key));
  }

  clearCache() {
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key.includes(this.applicationPrefix)) {
        window.localStorage.removeItem(key);
      }
    }
  }

  storeApplicationData(apps: HatApplication[]) {
    apps.forEach( app => {
      this.setApp(this.applicationPrefix + app.application.id, {app: app, date: addMinutes(new Date(), 5) })
    })
  }

  getApplicationById(appId: string): Observable<HatApplication> {
    const cached = this.getApp(this.applicationPrefix + appId);

    if (cached && cached.app && isFuture(cached.date)) {
      return of(cached.app);
    } else {
      return this.hatSvc.getApplicationById(appId);
    }
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HatApiService } from '../core/services/hat-api.service';
import { HatApplication } from './hat-application.interface';
import { SheFeed } from '../she/she-feed.interface';

@Injectable()
export class HatApplicationsService {

  constructor(private hatSvc: HatApiService) { }

  getApplicationList(): Observable<HatApplication[]> {
    return this.hatSvc.getApplicationList()
      .map((apps: HatApplication[]) => apps.filter(app => app.application.kind.kind === 'App'));
  }

  getApplicationDetails(application: string): Observable<HatApplication> {
    return this.hatSvc.getApplicationById(application)
      .flatMap((app: HatApplication) => {
        if (app.application.kind.kind === 'App') {
          return Observable.of(app);
        } else {
          return Observable.throw('Requested resource is not an app.');
        }
      });
  }

  getApplicationData(application: string): Observable<SheFeed[]> {
    return this.hatSvc.getSheRecords(application);
  }
}

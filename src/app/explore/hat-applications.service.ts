import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HatApplication, HatApplicationContent } from './hat-application.interface';
import { HatApiV2Service } from '../services/hat-api-v2.service';

@Injectable()
export class HatApplicationsService {

  constructor(private hatSvc: HatApiV2Service) { }

  getApplicationList(): Observable<HatApplicationContent[]> {
    return this.hatSvc.getApplicationList().map((hatApps: HatApplication[]) => {
      return hatApps.map(app => app.application);
    });
  }

  getApplicationDetails(application: string): Observable<HatApplicationContent> {
    return this.hatSvc.getApplicationById(application).map((hatApp: HatApplication) => hatApp.application);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HatApiService } from '../core/services/hat-api.service';
import { HatApplication } from './hat-application.interface';
import { SheFeed } from '../she/she-feed.interface';

@Injectable()
export class HatApplicationsService {

  constructor(private hatSvc: HatApiService) { }

  getApplicationList(kind: string = null): Observable<HatApplication[]> {
    if (kind) {
      return this.hatSvc.getApplicationList()
        .map((apps: HatApplication[]) => apps.filter((app: HatApplication) => app.application.kind.kind === kind));
    } else {
      return this.hatSvc.getApplicationList();
    }
  }

  getApplicationDetails(application: string): Observable<HatApplication> {
    return this.hatSvc.getApplicationById(application);
  }

  getApplicationData(application: string): Observable<SheFeed[]> {
    return this.hatSvc.getSheRecords(application);
  }
}

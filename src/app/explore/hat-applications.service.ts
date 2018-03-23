import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HatApiService } from '../core/services/hat-api.service';
import { HatApplication } from './hat-application.interface';
import { SheFeed } from '../dashboard/she-feed.interface';

@Injectable()
export class HatApplicationsService {

  constructor(private hatSvc: HatApiService) { }

  getApplicationList(): Observable<HatApplication[]> {
    return this.hatSvc.getApplicationList();
  }

  getApplicationDetails(application: string): Observable<HatApplication> {
    return this.hatSvc.getApplicationById(application);
  }

  getApplicationData(application: string): Observable<SheFeed[]> {
    return this.hatSvc.getSheRecords(application);
  }
}

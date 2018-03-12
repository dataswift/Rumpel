import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HatApplication } from './hat-application.interface';
import { HatApiV2Service } from '../services/hat-api-v2.service';

@Injectable()
export class HatApplicationsService {

  constructor(private hatSvc: HatApiV2Service) { }

  getApplicationList(): Observable<HatApplication[]> {
    return this.hatSvc.getApplicationList();
  }

  getApplicationDetails(application: string): Observable<HatApplication> {
    return this.hatSvc.getApplicationById(application);
  }
}

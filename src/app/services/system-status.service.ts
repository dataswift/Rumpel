import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { HatApiService } from '../core/services/hat-api.service';
import { SystemStatusInterface } from '../shared/interfaces/system-status.interface';
import {CacheService} from '../core/services/cache.service';


@Injectable()
export class SystemStatusService {
  systemStatusKey = 'system-status';
  systemStatusMaxAge = 60; // in minutes

  constructor(private hatApiSvc: HatApiService,
              private cacheSvc: CacheService) {
  }

  get systemStatus() {
    return this.cacheSvc.get<SystemStatusInterface[]>(this.systemStatusKey, this.fetchSystemStatus(), this.systemStatusMaxAge);
  }

  fetchSystemStatus(): Observable<SystemStatusInterface[]> {
    return this.hatApiSvc.getSystemStatusRecords();
  }
}

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HatApiService } from '../core/services/hat-api.service';
import { SystemStatusInterface } from '../shared/interfaces/system-status.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class SystemStatusService {
  constructor(private hat: HatApiService) {
  }

  fetchSystemStatus(): Observable<SystemStatusInterface[]> {
    return this.hat.getSystemStatusRecords()
      .pipe(map((status: SystemStatusInterface[]) =>
        status.filter(record => record.title === 'Database Storage' ||
          record.title === 'Database Storage Used Share' ||
          record.title === 'Previous Login')));
  }
}

import {HatApiService} from '../../core/services/hat-api.service';
import {Observable, of} from 'rxjs';
import {HatApplication} from '../../explore/hat-application.interface';
import {shareReplay} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class HatSetupService {
  private cache$: Observable<HatApplication[]>;

  constructor(private hatSvc: HatApiService) {
  }

  getApplicationHmi(): Observable<HatApplication[]> {
    const parentApp = window.localStorage.getItem('apps-parent');
    const dependencies = window.localStorage.getItem('apps-dependencies') || [];

    if (parentApp) {
      this.cache$ = of(JSON.parse(storage));
    }

    console.log('cache', this.cache$);
    if (!this.cache$) {
      console.log(this.cache$);

      this.cache$ = this.hatSvc.getApplicationHmi().pipe(
        shareReplay(1)
      );
    }

    return this.cache$;
  }

}

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';
import { HatApiService } from './hat-api.service';
import { AuthService } from './auth.service';

@Injectable()
export class UiStateService {
  private state$: Subject<any>;
  private dataSources: Array<string>;
  private dataTypes: Array<string>;
  private defaultMenu: Array<any>;

  constructor(private hat: HatApiService, private auth: AuthService) {
    this.dataSources = [];
    this.dataTypes = [];
    this.state$ = <Subject<any>>new Subject();

    this.auth.getAuth$()
      .flatMap(authenticated => {
        if (authenticated)
          return this.hat.getDataSources()
      })
      .subscribe(dataSources => {
        for (let dataSource of dataSources) {
          if (!(~this.dataSources.indexOf(dataSource.source))) {
            this.dataSources.push(dataSource.source);
          }

          if (!(~this.dataTypes.indexOf(dataSource.name))) {
            this.dataTypes.push(dataSource.name);
          }
        }

        let state = { dataSources: this.dataSources, dataTypes: this.dataTypes };

        localStorage.setItem('state', JSON.stringify(state));
        this.state$.next(state);
    });
  }

  getState$() {
    return this.state$.asObservable();
  }

  getDataTypes() {
    const stateStr = localStorage.getItem('state');
    const state = JSON.parse(stateStr);
    return state.dataTypes;
  }

}

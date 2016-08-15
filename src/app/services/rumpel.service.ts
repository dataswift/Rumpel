import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';
import { HatTable } from '../shared/interfaces';
import { NotesHatModel } from '../shared/hat-models';
import { HatApiService, MarketSquareService } from '../services';

import * as moment from 'moment';

@Injectable()
export class RumpelService {
  private state: { isAuthenticated: boolean; dataTables: Array<HatTable> };
  private loaded: boolean;
  private _state$: Subject<any>;
  private state$: Observable<any>;

  constructor(private hat: HatApiService,
              private market: MarketSquareService) {
    this.state = { isAuthenticated: false, dataTables: [] };
    this.loaded = false;

    this._state$ = <Subject<any>>new Subject();
    this.state$ = this._state$.asObservable();
  }

  loadTableList(): Observable<any> {
    if (this.loaded) {
      this._state$.next(this.state);
      return this.state$;
    }

    this.hat.getDataSources()
      .flatMap(rawTables => {
        const newTables = rawTables.map(this.mapRawTable);

        this.state.dataTables = this.state.dataTables.concat(newTables);

        return this.setupRumpel();
      })
      .subscribe(
        idMappings => {
          this.loaded = true;
          return this._state$.next(this.state);
        },
        err => console.log('Error setting up Rumpel data tables')
      );

    return this.state$;
  }

  setupRumpel(): Observable<any> {
    return Observable.forkJoin(
      this.setupTable('notes')
    );
  }

  isTable(name: string, source: string): HatTable {
    return this.state.dataTables.find(table => table.name === name && table.source === source);
  }

  isDataType(dt: string): HatTable {
    return this.state.dataTables.find(table => table.name === dt);
  }

  isDataSource(ds: string): HatTable {
    return this.state.dataTables.find(table => table.source === ds);
  }

  private setupTable(name: string) {
    let foundTable = this.isTable(name, 'rumpel');

    if (foundTable) {
      return this.hat.getModelMapping(foundTable.id)
        .map(idMapping => foundTable.idMapping = idMapping);;
    } else {
      return this.hat.postModel(NotesHatModel)
        .map(idMapping => foundTable.idMapping = idMapping);
    }
  }

  private registerWithMS() {
    return this.market.connect();
  }

  private mapRawTable(table: any): HatTable {
    return { id: table.id,
             name: table.name,
             source: table.source,
             lastUpdated: moment(table.lastUpdated),
             dataLoaded: false };
  }

}

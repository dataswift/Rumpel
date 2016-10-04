import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';
import { HatApiService } from '../services/hat-api.service';

import { NotablesHatModel } from './notables.hatmodel';
import { Notable } from '../shared/interfaces';

@Injectable()
export class NotablesService {
  private store: {
    notables: Array<Notable>;
    idMapping: any;
    tableId: number;
  };
  private failedAttempts: number;

  private _notables$: Subject<Notable[]>;
  public notables$: Observable<Notable[]>;

  constructor(private hat: HatApiService) {
    this.store = {
      notables: [],
      idMapping: {},
      tableId: null
    };

    this.failedAttempts = 0;

    this._notables$ = <Subject<Notable[]>>new Subject();
    this.notables$ = this._notables$.asObservable();

    this.verifyTableExists().subscribe(idMapping => {
      // TODO: service currently does not retrieve table ID when the HAT model is posted for the first time
      this.store.idMapping = idMapping;
    });
  }

  verifyTableExists() {
    return this.hat.getTable('notables', 'rumpel')
      .flatMap(table => {
        if (table === "Not Found") {
          return this.hat.postModel(NotablesHatModel);
        } else {
          this.store.tableId = table.id;
          return this.hat.getModelMapping(table.id);
        }
      });
  }

  getRecentNotables() {
    if (this.store.tableId) {
      return this.hat.getValues(this.store.tableId, '1475255673', true)
        .map(notables => notables.map(notable => notable.notables))
        .subscribe(notables => {
          this.store.notables = notables;

          this.pushToStream();
        });
    } else if (this.failedAttempts <= 5) {
      this.failedAttempts++;
      return Observable.timer(50).subscribe(() => this.getRecentNotables());
    }
  }

  postNotable(data) {
    data.shared = data.shared.join(",");
    this.hat.postRecord(data, this.store.idMapping, 'notables')
      .subscribe(record => {
        this.store.notables.unshift(data);

        this.pushToStream();
      });
  }

  private pushToStream() {
    this._notables$.next(this.store.notables);
  }
}

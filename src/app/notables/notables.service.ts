import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';
import { HatApiService } from '../services/hat-api.service';

import { NotablesHatModel } from './notables.hatmodel';
import { Notable } from '../shared/interfaces';
import * as marked from 'marked';

@Injectable()
export class NotablesService {
  private store: {
    notables: Array<Notable>;
    idMapping: any;
    tableId: number;
  };
  private tableVerified: boolean;
  private failedAttempts: number;
  private md: any;

  private _notables$: Subject<Notable[]>;
  public notables$: Observable<Notable[]>;

  constructor(private hat: HatApiService) {
    this.store = {
      notables: [],
      idMapping: {},
      tableId: null
    };

    this.tableVerified = false;
    this.failedAttempts = 0;
    this.md = marked.setOptions({});

    this._notables$ = <Subject<Notable[]>>new Subject();
    this.notables$ = this._notables$.asObservable();

    this.verifyTableExists().subscribe(idMapping => {
      // TODO: service currently does not retrieve table ID when the HAT model is posted for the first time
      this.tableVerified = true;
      this.store.idMapping = idMapping;
    });
  }

  verifyTableExists() {
    if (this.tableVerified) {
      return Observable.of(this.store.idMapping);
    }

    return this.hat.getTable('notables', 'rumpel')
      .flatMap(table => {
        if (table === "Not Found") {
          return this.hat.postModel(NotablesHatModel.model);
        } else {
          this.store.tableId = table.id;
          return this.hat.getModelMapping(table.id);
        }
      });
  }

  getRecentNotables() {
    if (this.store.notables.length > 0) {
      this.pushToStream();
    } else if (this.store.tableId) {
      this.hat.getValues(this.store.tableId, '1475255673', true)
        .map(notables => {
          return notables.map(notable => {
            let note = new Notable(notable.data['notables']);
            note.message = this.md.parse(note.message);

            return note;
          });
        })
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

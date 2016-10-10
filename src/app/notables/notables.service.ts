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

  private _notables$: Subject<Notable[]>;
  public notables$: Observable<Notable[]>;

  private _editedNotable$: Subject<Notable>;
  public editedNotable$: Observable<Notable>;

  constructor(private hat: HatApiService) {
    this.store = {
      notables: [],
      idMapping: {},
      tableId: null
    };

    this.tableVerified = false;
    this.failedAttempts = 0;

    this._notables$ = <Subject<Notable[]>>new Subject();
    this.notables$ = this._notables$.asObservable();

    this._editedNotable$ = <Subject<Notable>>new Subject();
    this.editedNotable$ = this._editedNotable$.asObservable();

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
      this.hat.getValuesWithLimit(this.store.tableId)
        .map(notables => {
          return notables.map(notable => {
            return new Notable(notable.data['notables'], notable.id);
          });
        })
        .subscribe(notables => {
          this.store.notables = notables;

          this.pushToStream();
        });
    } else if (this.failedAttempts <= 10) {
      this.failedAttempts++;
      return Observable.timer(75).subscribe(() => this.getRecentNotables());
    }
  }

  updateNotable(data) {
    data.shared = data.shared.join(",");

    this.hat.deleteRecord(data.id)
        .flatMap(responseMessage => {
          if (responseMessage.message.indexOf("deleted") > -1) {
            let foundNoteIndex = this.store.notables.findIndex(note => note.id === data.id);

            if (foundNoteIndex > -1) {
              this.store.notables.splice(foundNoteIndex, 1);
            }
          }

          delete data.id;

          return this.hat.postRecord(data, this.store.idMapping, 'notables');
        })
        .subscribe(record => {
          this.store.notables.unshift(new Notable(data));

          this.pushToStream();
        });
  }

  postNotable(data) {
    data.shared = data.shared.join(",");
    this.hat.postRecord(data, this.store.idMapping, 'notables')
      .subscribe(record => {
        this.store.notables.unshift(new Notable(data));

        this.pushToStream();
      });
  }

  editNotable(notable: Notable) {
    this._editedNotable$.next(notable);
  }

  deleteNotable(id: number) {
    this.hat.deleteRecord(id).subscribe(responseMessage => {
      if (responseMessage.message.indexOf("deleted") > -1) {
        let foundNoteIndex = this.store.notables.findIndex(note => note.id === id);
        if (foundNoteIndex > -1) {
          this.store.notables.splice(foundNoteIndex, 1);

          this.pushToStream();
        }
      }
    });
  }

  private pushToStream() {
    this._notables$.next(this.store.notables);
  }
}

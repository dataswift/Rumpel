import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable, ReplaySubject } from 'rxjs/Rx';
import { HatApiService } from '../services/hat-api.service';
import { DataPlugService } from '../services/data-plug.service';
import { MarketSquareService } from '../market-square/market-square.service';

import { NotablesHatModel } from './notables.hatmodel';
import { Notable } from '../shared/interfaces';

import * as moment from 'moment';
import { Moment } from 'moment';

@Injectable()
export class NotablesService {
  private store: {
    notables: Array<Notable>;
    idMapping: any;
    tableId: number;
  };
  private tableVerified: boolean;
  private failedAttempts: number;

  public notablesState: {
    allowedActions?: { canPost: boolean, canExpire: boolean };
    notablesOfferClaimed?: boolean;
    dataDebit?: { confirmed: boolean; id: string; dateCreated: Moment; };
  };

  private _notables$: Subject<Notable[]>;
  public notables$: Observable<Notable[]>;

  private _editedNotable$: ReplaySubject<Notable>;
  public editedNotable$: Observable<Notable>;

  private _notablesMeta$: BehaviorSubject<any>;
  public notablesMeta$: Observable<any>;

  constructor(private hat: HatApiService,
              private market: MarketSquareService,
              private dataPlug: DataPlugService) {

    this.store = {
      notables: [],
      idMapping: {},
      tableId: null
    };

    this.tableVerified = false;
    this.failedAttempts = 0;

    this.notablesState = {
      allowedActions: { canPost: false, canExpire: false },
      notablesOfferClaimed: false
    };

    this._notables$ = <Subject<Notable[]>>new Subject();
    this.notables$ = this._notables$.asObservable();

    this._editedNotable$ = <ReplaySubject<Notable>>new ReplaySubject();
    this.editedNotable$ = this._editedNotable$.asObservable();

    this._notablesMeta$ = <BehaviorSubject<any>>new BehaviorSubject(this.notablesState);
    this.notablesMeta$ = this._notablesMeta$.asObservable();

    this.verifyTableExists().subscribe(idMapping => {
      // TODO: service currently does not retrieve table ID when the HAT model is posted for the first time
      this.tableVerified = true;
      this.store.idMapping = idMapping;
    });

    this.market.getOffer('32dde42f-5df9-4841-8257-5639db222e41')
      .subscribe(offerInfo => {
        this.notablesState.notablesOfferClaimed = !offerInfo.error;
        this.notablesState.dataDebit = {
          confirmed: offerInfo.confirmed,
          id: offerInfo.dataDebitId,
          dateCreated: moment(offerInfo.dateCreated)
        };
        this._notablesMeta$.next(this.notablesState);
      });

    this.dataPlug.getFacebookTokenInfo().subscribe(tokenInfo => {
      if (!tokenInfo.error) {
        this.notablesState.allowedActions = {
          canPost: tokenInfo.canPost && moment(tokenInfo.expires).isAfter(),
          canExpire: moment(tokenInfo.expires).subtract(7, 'days').isAfter()
        };

        this._notablesMeta$.next(this.notablesState);
      }
    });
  }

  verifyTableExists() {
    if (this.tableVerified) {
      return Observable.of(this.store.idMapping);
    }

    return this.hat.getTable('notablesv1', 'rumpel')
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
            return new Notable(notable.data['notablesv1'], notable.id);
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
    data.shared_on = data.shared_on.join(",");

    this.hat.deleteRecord(data.id)
        .flatMap(responseMessage => {
          if (responseMessage.message.indexOf("deleted") > -1) {
            let foundNoteIndex = this.store.notables.findIndex(note => note.id === data.id);

            if (foundNoteIndex > -1) {
              this.store.notables.splice(foundNoteIndex, 1);
            }
          }

          delete data.id;

          return this.hat.postRecord(data, this.store.idMapping, 'notablesv1');
        })
        .subscribe(recordArray => {
          this.store.notables.unshift(new Notable(data, recordArray[0].record.id));

          this.pushToStream();
        });
  }

  postNotable(data) {
    data.shared_on = data.shared_on.join(",");
    this.hat.postRecord(data, this.store.idMapping, 'notablesv1')
      .subscribe(recordArray => {
        this.store.notables.unshift(new Notable(data, recordArray[0].record.id));

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

  claimNotablesOffer() {
    return this.market.claimOffer('32dde42f-5df9-4841-8257-5639db222e41');
  }

  updateDataDebitInfo(update: { id: string; confirmed: boolean; dateCreated: Moment; }) {
    this.notablesState.dataDebit = update;
    this._notablesMeta$.next(this.notablesState);
  }

  private pushToStream() {
    this._notables$.next(this.store.notables);
  }
}

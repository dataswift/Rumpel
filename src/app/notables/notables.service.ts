/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs/Rx';
import { HatApiService } from '../services/hat-api.service';
import { DataPlugService } from '../services/data-plug.service';
import { MarketSquareService } from '../market-square/market-square.service';

import { APP_CONFIG, IAppConfig } from '../app.config'
import { NotablesHatModel } from './notables.hatmodel';
import { Notable, MSUserClaim, DataDebit } from '../shared/interfaces';

import * as moment from 'moment';
import {BaseRumpelDataService} from "../services/base-rumpel-data.service";
import {NotablesServiceMeta} from "../shared/interfaces/notables-service-meta.interface";
import { UiStateService } from "../services/ui-state.service";

@Injectable()
export class NotablesService extends BaseRumpelDataService<Notable> {
  public notablesServiceMeta: NotablesServiceMeta;

  private _editedNotable$: ReplaySubject<Notable>;
  public editedNotable$: Observable<Notable>;

  private _notablesMeta$: BehaviorSubject<NotablesServiceMeta>;
  public notablesMeta$: Observable<NotablesServiceMeta>;

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              hat: HatApiService,
              uiSvc: UiStateService,
              private market: MarketSquareService,
              private dataPlug: DataPlugService) {
    super(hat, uiSvc);

    this.notablesServiceMeta = {
      phata: this.hat.hatDomain,
      offerClaimed: false,
      userMessage: '',
      canPost: ['marketsquare'],
      activeIntegrations: this.config.notables.activeIntegrations
    };

    this._editedNotable$ = <ReplaySubject<Notable>>new ReplaySubject();
    this.editedNotable$ = this._editedNotable$.asObservable();

    this._notablesMeta$ = <BehaviorSubject<NotablesServiceMeta>>new BehaviorSubject(this.notablesServiceMeta);
    this.notablesMeta$ = this._notablesMeta$.asObservable();

    this.ensureTableExists('notablesv1', 'rumpel', NotablesHatModel.model);

    this.updateNotablesState();

    this.dataPlug.getTokenInfo('Facebook').subscribe((tokenInfo: any) => {
      if (!tokenInfo.error && tokenInfo.canPost) {
        this.notablesServiceMeta.canPost.push('facebook');

        this._notablesMeta$.next(this.notablesServiceMeta);
      }
    });

    this.dataPlug.getTokenInfo('Twitter').subscribe(tokenInfo => {
      if (!tokenInfo.error && tokenInfo[0].successful) {
        this.notablesServiceMeta.canPost.push('twitter');

        this._notablesMeta$.next(this.notablesServiceMeta);
      }
    });
  }

  updateNotablesState(): void {
    this.getUserClaim()
      .subscribe((offerInfo: MSUserClaim) => {
        if (offerInfo.dataDebitId) {
          this.notablesServiceMeta.offerClaimed = true;
          this.notablesServiceMeta["dataDebit"] = {
            id: offerInfo.dataDebitId,
            confirmed: offerInfo.confirmed,
            dateCreated: moment(offerInfo.dateCreated)
          };
        } else {
          this.notablesServiceMeta.offerClaimed = false;
        }

        this._notablesMeta$.next(this.notablesServiceMeta);
      });

  }

  private getUserClaim(): Observable<MSUserClaim> {
    return this.market.getOffer(this.config.notables.marketSquareOfferId)
      .flatMap((offerInfo: MSUserClaim)  => {
        if (offerInfo.confirmed) {
          return Observable.of(offerInfo);
          // If the MaketSquare reports offer as unconfirmed, check its status on the HAT
          // For the initial 30 mins after offer confirmation MarketSquare can report it as unconfirmed
        } else if (offerInfo.dataDebitId) {
          return this.hat.getSlimDataDebit(offerInfo.dataDebitId)
            .map((ddInfo: DataDebit) => {
              offerInfo.confirmed = ddInfo.enabled;
              return offerInfo;
            });
        } else {
          return Observable.of({});
        }
      });
  }

  updateNotable(notable: Notable): void {
    this.hat.deleteRecord(notable.id)
      .subscribe(responseMessage => {
        if (responseMessage.message.indexOf("deleted") > -1) {
          let foundNoteIndex = this.store.data.findIndex(note => note.id === notable.id);

          if (foundNoteIndex > -1) {
            this.store.data.splice(foundNoteIndex, 1);
          }
        }

        delete notable.id;

        this.postNotable(notable);
      });
  }

  postNotable(data): void {
    this.hat.postRecord(data, this.store.idMapping, 'notablesv1')
      .flatMap(recordArray => this.getFirstNotable())
      .subscribe((notables: Notable[]) => {
        this.market.tickle();
        this.store.data.unshift(notables[0]);

        this.pushToStream();
      });
  }

  getFirstNotable(): Observable<any> {
    return this.hat.getValuesWithLimit(this.store.tableId, 1)
      .map(rawNotable => rawNotable.map(this.mapData));
  }

  editNotable(notable: Notable) {
    this._editedNotable$.next(notable);
  }

  deleteNotable(id: number) {
    this.hat.deleteRecord(id).subscribe(responseMessage => {
      if (responseMessage.message.indexOf("deleted") > -1) {
        let foundNoteIndex = this.store.data.findIndex(note => note.id === id);
        if (foundNoteIndex > -1) {
          this.store.data.splice(foundNoteIndex, 1);

          this.market.tickle();
          this.pushToStream();
        }
      }
    });
  }

  mapData(rawNotable: any): Notable {
    return new Notable(rawNotable.data["notablesv1"], rawNotable.id);
  }

  setupNotablesService(): Observable<DataDebit> {
    return this.market.claimOffer(this.config.notables.marketSquareOfferId)
      .flatMap((offerInfo: MSUserClaim) => {
        return this.hat.updateDataDebit(offerInfo.dataDebitId, 'enable')
      });
  }
}

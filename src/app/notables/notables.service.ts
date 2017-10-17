/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs/Rx';
import { HatApiV2Service } from '../services/hat-api-v2.service';
import { DataPlugService } from '../data-management/data-plug.service';
import { MarketSquareService } from '../market-square/market-square.service';

import { APP_CONFIG, IAppConfig } from '../app.config';
import { Notable, MSUserClaim, DataDebit } from '../shared/interfaces';

import * as moment from 'moment';
import { BaseDataService } from '../services/base-data.service';
import { NotablesServiceMeta } from '../shared/interfaces/notables-service-meta.interface';
import { UiStateService } from '../services/ui-state.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.interface';
import {HatRecord} from '../shared/interfaces/hat-record.interface';

@Injectable()
export class NotablesService extends BaseDataService<Notable> {
  public notablesServiceMeta: NotablesServiceMeta;

  private _editedNotable$: ReplaySubject<Notable>;
  public editedNotable$: Observable<Notable>;

  private _notablesMeta$: BehaviorSubject<NotablesServiceMeta>;
  public notablesMeta$: Observable<NotablesServiceMeta>;

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              hat: HatApiV2Service,
              uiSvc: UiStateService,
              private market: MarketSquareService,
              private userSvc: UserService) {
    super(hat, uiSvc, 'rumpel', 'notablesv1');

    this.notablesServiceMeta = {
      phata: '',
      offerClaimed: false,
      userMessage: '',
      activeIntegrations: this.config.notables.activeIntegrations
    };

    this._editedNotable$ = <ReplaySubject<Notable>>new ReplaySubject(1);
    this.editedNotable$ = this._editedNotable$.asObservable();

    this._notablesMeta$ = <BehaviorSubject<NotablesServiceMeta>>new BehaviorSubject(this.notablesServiceMeta);
    this.notablesMeta$ = this._notablesMeta$.asObservable();

    userSvc.user$.subscribe((user: User) => {
      this.notablesServiceMeta.phata = user.fullDomain;
      this._notablesMeta$.next(this.notablesServiceMeta);
    });
  }

  get hatDomain(): string {
    return this.notablesServiceMeta.phata;
  }

  updateNotablesState(): void {
    this.getUserClaim()
      .subscribe((offerInfo: MSUserClaim) => {
        if (offerInfo && offerInfo.dataDebitId) {
          this.notablesServiceMeta.offerClaimed = true;
          this.notablesServiceMeta['dataDebit'] = {
            id: offerInfo.dataDebitId,
            confirmed: offerInfo.confirmed,
            dateCreated: moment(offerInfo.dateCreated)
          };
        } else {
          this.notablesServiceMeta.offerClaimed = false;
          this.notablesServiceMeta['dataDebit'] = {
            id: null,
            confirmed: null,
            dateCreated: null
          };
        }

        this._notablesMeta$.next(this.notablesServiceMeta);
      });

  }

  private getUserClaim(): Observable<MSUserClaim> {
    return this.market.getOffer(this.config.notables.marketSquareOfferId)
      .flatMap((offerInfo: MSUserClaim)  => {
        if (offerInfo && offerInfo.confirmed) {
          return Observable.of(offerInfo);
          // If the MaketSquare reports offer as unconfirmed, check its status on the HAT
          // For the initial 30 mins after offer confirmation MarketSquare can report it as unconfirmed
        } else if (offerInfo && offerInfo.dataDebitId) {
          return this.hat.getDataDebit(offerInfo.dataDebitId)
            .map((ddInfo: any) => {
              offerInfo.confirmed = ddInfo.enabled;
              return offerInfo;
            });
        } else {
          return Observable.of(null);
        }
      });
  }

  postNotable(recordValue: Notable): void {
    this.save(recordValue, () => this.market.tickle());
  }

  editNotable(notable: Notable) {
    this._editedNotable$.next(notable);
  }

  coerceType(rawNotable: HatRecord<any>): HatRecord<Notable> {
    return {
      endpoint: rawNotable.endpoint,
      recordId: rawNotable.recordId,
      data: new Notable(rawNotable.data)
    };
  }

  setupNotablesService(): Observable<DataDebit> {
    return this.market.claimOffer(this.config.notables.marketSquareOfferId)
      .flatMap((offerInfo: MSUserClaim) => {
        if (offerInfo) {
          return this.hat.updateDataDebit(offerInfo.dataDebitId, 'enable')
            .catch(err => {
              console.log('Failed to confirm Data Debit with the HAT', err);
              return Observable.of(null);
            });
        } else {
          return Observable.of(null);
        }
      });
  }
}

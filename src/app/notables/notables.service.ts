/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BaseDataService } from '../services/base-data.service';
import { HatApiV2Service } from '../services/hat-api-v2.service';
import { DexApiService } from '../services/dex-api.service';
import { UserService } from '../user/user.service';

import { APP_CONFIG, AppConfig } from '../app.config';
import { Notable, DataDebit } from '../shared/interfaces';
import { NotablesServiceMeta } from '../shared/interfaces/notables-service-meta.interface';
import { User } from '../user/user.interface';
import { HatRecord } from '../shared/interfaces/hat-record.interface';
import { DexOfferClaimRes } from '../shared/interfaces/dex-offer-claim-res.interface';

@Injectable()
export class NotablesService extends BaseDataService<Notable> {
  public notablesServiceMeta: NotablesServiceMeta;

  private _editedNotable$: ReplaySubject<HatRecord<Notable>>;
  public editedNotable$: Observable<HatRecord<Notable>>;

  private _notablesMeta$: BehaviorSubject<NotablesServiceMeta>;
  public notablesMeta$: Observable<NotablesServiceMeta>;

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
              hat: HatApiV2Service,
              userSvc: UserService,
              private dex: DexApiService) {
    super(hat, userSvc, config.name.toLowerCase(), 'notablesv1', 'updated_time');

    this.notablesServiceMeta = {
      phata: '',
      offerClaimed: false,
      userMessage: ''
    };

    this._editedNotable$ = <ReplaySubject<HatRecord<Notable>>>new ReplaySubject(1);
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

  getNotablesOfferClaimStatus(): Observable<DexOfferClaimRes> {
    return this.dex.getOfferClaim(this.config.notables.dexOfferId)
      .flatMap((offerClaim: DexOfferClaimRes)  => {
        if (offerClaim.confirmed) {
          return Observable.of(offerClaim);
          // If the MaketSquare reports offer as unconfirmed, check its status on the HAT
          // For the initial 30 mins after offer confirmation MarketSquare can report it as unconfirmed
        } else {
          return this.hat.getDataDebit(offerClaim.dataDebitId)
            .map((dataDebit: DataDebit) => {
              offerClaim.confirmed = dataDebit.bundles[0].enabled;

              return offerClaim;
            });
        }
      });
  }

  saveNotable(recordValue: HatRecord<Notable>): Observable<HatRecord<Notable>> {
    const permissionKey = recordValue.data.isShared ? 'allow' : 'restrict';
    let filePermissionUpdate$: Observable<any>;
    const notablePost$ = recordValue.recordId ? this.update(recordValue) : this.save(recordValue.data);

    if (recordValue.data.photov1) {
      filePermissionUpdate$ = this.hat.updateFilePermissions(recordValue.data.photov1.link.split('/').pop(), permissionKey);
    } else {
      filePermissionUpdate$ = Observable.of(null); // Dummy observable to make subsequent forkJoin succeed
    }
    // TODO: add notable tickle call

    return Observable.forkJoin(notablePost$, filePermissionUpdate$)
      .map(([savedNotable, permissionUpdateResult]) => this.coerceType(savedNotable));
  }

  editNotable(notable: HatRecord<Notable>) {
    this._editedNotable$.next(notable);
  }

  setupNotablesService(): Observable<DataDebit> {
    return this.dex.claimOffer(this.config.notables.dexOfferId)
      .flatMap((offerClaim: DexOfferClaimRes) => this.hat.updateDataDebit(offerClaim.dataDebitId, 'enable'))
  }

  coerceType(rawNotable: HatRecord<any>): HatRecord<Notable> {
    return {
      endpoint: rawNotable.endpoint,
      recordId: rawNotable.recordId,
      data: new Notable(rawNotable.data)
    };
  }
}

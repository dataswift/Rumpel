/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org>
 */

import { Injectable } from '@angular/core';
import { HatApiService } from '../services/hat-api.service';
import { MarketSquareService } from '../market-square/market-square.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DataDebitService {

  constructor(private _hatSvc: HatApiService,
              private _marketSvc: MarketSquareService) {}

  getDataOffer(dataDebitId: string, forceReload: boolean): Observable<any> {
    return Observable.forkJoin(this._marketSvc.getAllOffers(forceReload), this._marketSvc.getOfferIdByDataDebitId(dataDebitId));
  }

  loadDataDebit(uuid: string) {
    return this._hatSvc.getDataDebit(uuid);
  }

  loadAllDataDebits() {
    return this._hatSvc.getAllDataDebits();
  }

}

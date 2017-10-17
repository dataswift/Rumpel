/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { BaseDataService } from './base-data.service';
import { HatApiV2Service } from './hat-api-v2.service';
import { UiStateService } from './ui-state.service';
import { DataTable } from '../shared/interfaces/index';


export abstract class BaseRumpelDataService<T> extends BaseDataService<T> {
  constructor(hat: HatApiV2Service, uiSvc: UiStateService, namespace: string, endpoint: string) {
    super(hat, uiSvc, namespace, endpoint);

    this.clearLocalStore();
  }

  postData(dataItem: T, recordName: string): void {
    this.hat.postRecord(dataItem, this.store.idMapping, recordName)
      .subscribe(postedDataArray => {
        this.store.data.unshift(dataItem);

        this.pushToStream();
      });
  }

  clearLocalStore(): void {
    this.store = {
      data: [],
      tableId: null,
      idMapping: null
    };

    this.pushToStream();
  }

}

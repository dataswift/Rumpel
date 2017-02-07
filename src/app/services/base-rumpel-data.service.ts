/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import {BaseDataService} from "./base-data.service";
import {HatApiService} from "./hat-api.service";
import {UiStateService} from "./ui-state.service";
import {DataTable} from "../shared/interfaces/index";


export abstract class BaseRumpelDataService<T> extends BaseDataService<T> {
  constructor(hat: HatApiService, uiSvc: UiStateService) {
    super(hat, uiSvc);

    this.store = {
      data: [],
      tableId: null,
      idMapping: null
    };
  }

  ensureTableExists(name: string, source: string, hatDataModel?: any): void {
    this.uiSvc.tables$
      .flatMap((tables: DataTable[]) => {
        const tableFound = tables.find((table: DataTable) => table.name === name && table.source === source);
        if (tableFound) {
          this.store.tableId = tableFound.id;
          return this.hat.getModelMapping(tableFound.id);
        } else {
          return this.hat.postModel(hatDataModel);
        }
      })
      .subscribe(maps => {
        this.store.tableId = maps.id;
        this.store.idMapping = maps.mapping;
      });
  }

  postData(dataItem: T, recordName: string): void {
    this.hat.postRecord(dataItem, this.store.idMapping, recordName)
      .subscribe(postedDataArray => {
        this.store.data.unshift(dataItem);

        this.pushToStream();
      })
  }

}

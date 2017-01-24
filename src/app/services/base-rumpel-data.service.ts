/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import {BaseDataService} from "./base-data.service";
import {HatApiService} from "./hat-api.service";
import {UserService} from "./user.service";
import {User} from "../shared/interfaces/user.interface";

export abstract class BaseRumpelDataService<T> extends BaseDataService<T> {
  constructor(hat: HatApiService, userSvc: UserService) {
    super(hat, userSvc);

    this.store = {
      data: [],
      tableId: null,
      idMapping: null
    };
  }

  registerUser$Listener(name: string, source: string, hatDataModel?: any): void {
    this.userSvc.user$.subscribe((user: User) => {
      if (user.authenticated) {
        this.ensureTableExists(name, source, hatDataModel);
      }
    });
  }

  ensureTableExists(name: string, source: string, hatDataModel?: any): void {
    this.hat.getTable(name, source)
      .flatMap(table => {
        if (table === "Not Found") {
          return this.hat.postModel(hatDataModel);
        } else {
          this.store.tableId = table.id;
          return this.hat.getModelMapping(table.id);
        }
      })
      .subscribe(idMapping => {
        this.store.idMapping = idMapping;
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

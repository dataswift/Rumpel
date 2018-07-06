/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org>
 */

import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { DataDebitService } from '../data-debits.service';
import { AuthService } from '../../core/services/auth.service';
import { DataDebit } from '../../data-management/data-debit.interface';

@Component({
  selector: 'rum-tile-data-debit',
  templateUrl: 'tile-data-debit.component.html',
  styleUrls: ['tile-data-debit.component.scss']
})
export class TileDataDebitComponent implements OnInit {
  public debits: DataDebit[] = [];

  constructor(private ddSvc: DataDebitService, private authSvc: AuthService) {}

  ngOnInit() {
    this.authSvc.auth$.pipe(filter((authenticated: boolean) => authenticated))
      .subscribe(_ => {
        this.ddSvc.loadAllDataDebits().subscribe((dataDebits: DataDebit[]) => {
          this.debits = dataDebits;
        });
      });
  }

}

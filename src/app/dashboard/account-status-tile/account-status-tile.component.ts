/*
 * Copyright (C) 2017 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 4, 2017
 */

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../user/user.interface';
import { AccountStatus } from '../../user/account-status.interface';

@Component({
  selector: 'rum-account-status-tile',
  templateUrl: './account-status-tile.component.html',
  styleUrls: ['./account-status-tile.component.scss']
})
export class AccountStatusTileComponent implements OnInit {
  public username: string;
  public accountStatus: AccountStatus;

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
    this.authSvc.user$
      .subscribe((user: User) => this.username = user.hatId);

    // this.userSvc.getAccountStatus().subscribe((accountStatus: AccountStatus) => this.accountStatus = accountStatus);
  }

  round(value: number, decimalPlaces: number): number {
    const multiplier = Math.pow(10, decimalPlaces);

    return Math.round(value * multiplier) / multiplier;
  }

}

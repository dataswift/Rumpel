/*
 * Copyright (C) 2019 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Terry Lee <terry.lee@hatdex.org> 2, 2019
 */

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'rum-hat-claim-details',
  templateUrl: './hat-claim-details.component.html',
  styleUrls: ['./hat-claim-details.component.scss']
})
export class HatClaimDetailsComponent implements OnInit {
  @Input('email') public email: string;
  public errorInputMsg = 'Unspecified email address';

  constructor() { }

  ngOnInit() {
  }
  public getEmailValueOrError(): string {
    if (this.email) {
      return this.email;
    } else {
      return this.errorInputMsg;
    }
  }

}

/*
 * Copyright (C) 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Terry Lee <terry.lee@dataswift.io> 2, 2019
 */

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'rum-hat-claim-details',
  templateUrl: './hat-claim-details.component.html',
  styleUrls: ['./hat-claim-details.component.scss']
})
export class HatClaimDetailsComponent implements OnInit, OnChanges {
  @Input()
  public email: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.email.currentValue) {
      this.email = 'Unspecified email address';
    }
  }

  ngOnInit() {
  }
}

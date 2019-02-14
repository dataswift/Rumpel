/*
 * Copyright (C) 2019 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Terry Lee <terry.lee@hatdex.org> 2, 2019
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rum-hat-claim-subscriptions',
  templateUrl: './hat-claim-subscriptions.component.html',
  styleUrls: ['./hat-claim-subscriptions.component.scss']
})
export class HatClaimSubscriptionsComponent implements OnInit {
  public hatName: string;
  public hatDomain: string;

  constructor() { }

  ngOnInit() {
    const host = window.location.hostname;

    this.hatName = host.substring(0, host.indexOf('.'));
    this.hatDomain = host.substring(host.indexOf('.'));
  }
}

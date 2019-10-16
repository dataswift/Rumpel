/*
 * Copyright (C) 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Terry Lee <terry.lee@dataswift.io> 2, 2019
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'rum-hat-claim-subscriptions',
  templateUrl: './hat-claim-subscriptions.component.html',
  styleUrls: ['./hat-claim-subscriptions.component.scss']
})
export class HatClaimSubscriptionsComponent implements OnInit {

  @Output() newsletterOptins = new EventEmitter<string[]>();

  public hatName: string;
  public hatDomain: string;

  public optins: { madhatters: boolean; hatMonthly: boolean; hcf: boolean };

  constructor() { }

  ngOnInit() {
    const host = window.location.hostname;

    this.hatName = host.substring(0, host.indexOf('.'));
    this.hatDomain = host.substring(host.indexOf('.'));

    this.optins = { madhatters: false, hatMonthly: false, hcf: false };
    this.buildOptins();
  }


  buildOptins(): void {
    const optins: string[] = [];

    if (this.optins.madhatters) {
      optins.push('MadHATTERS');
    }
    if (this.optins.hatMonthly) {
      optins.push('HAT Monthly');
    }
    if (this.optins.hcf) {
      optins.push('HCF');
    }

    this.newsletterOptins.emit(optins);
  }
}

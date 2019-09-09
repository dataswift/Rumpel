/*
 * Copyright (C) 2019 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Terry Lee <terry.lee@dataswift.io> 2, 2019
 */

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rum-hat-claim-url',
  templateUrl: './hat-claim-url.component.html',
  styleUrls: ['./hat-claim-url.component.scss']
})
export class HatClaimUrlComponent implements OnInit {
  @Input() hatName: string;
  @Input() hatDomain: string;

  constructor() { }

  ngOnInit() {
  }
}

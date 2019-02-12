/*
 * Copyright (C) 2019 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Terry Lee <terry.lee@hatdex.org> 2, 2019
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'rum-hat-claim-success',
  templateUrl: './hat-claim-success.component.html',
  styleUrls: ['./hat-claim-success.component.scss']
})
export class HatClaimSuccessComponent implements OnInit {
  public hatName: string;
  public hatDomain: string;

  constructor(private route: ActivatedRoute,
              private authSvc: AuthService) { }

  ngOnInit() {
    const host = window.location.hostname;

    this.hatName = host.substring(0, host.indexOf('.'));
    this.hatDomain = host.substring(host.indexOf('.'));
  }

  goToLogin(avenue: string) {
    if (avenue==='ios') {
      // TODO
    } else if (avenue==='android') {
      // TODO
    } else if (avenue==='web') {
      // TODO
    }
  }
}

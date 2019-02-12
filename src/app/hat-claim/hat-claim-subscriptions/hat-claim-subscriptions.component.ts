/*
 * Copyright (C) 2019 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Terry Lee <terry.lee@hatdex.org> 2, 2019
 */

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';

const ERROR_MESSAGES = {
  authenticationError: 'ERROR: Current password incorrect',
  passwordStrengthError: 'ERROR: Password is too weak. Please make it harder to guess.',
  passwordMatchError: 'Provided passwords do not match'
};

@Component({
  selector: 'rum-hat-claim-subscriptions',
  templateUrl: './hat-claim-subscriptions.component.html',
  styleUrls: ['./hat-claim-subscriptions.component.scss']
})
export class HatClaimSubscriptionsComponent implements OnInit {
  public claimToken: string;
  public successMessage: string;
  public loadingText: string;
  public hatName: string;
  public hatDomain: string;
  public errorType: string;


  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((routeParams) => {
      this.claimToken = routeParams['claimToken'] || null;
    });

    const host = window.location.hostname;

    this.hatName = host.substring(0, host.indexOf('.'));
    this.hatDomain = host.substring(host.indexOf('.'));
  }

  errorText(): string {
    return ERROR_MESSAGES[this.errorType] || '';
  }

  clearErrors() {
    this.errorType = '';
    this.successMessage = null;
  }


  doSubscribe() {
    // TODO subscribe to hatters

    this.router.navigate(['hat', 'claim', 'steps', 'confirm'])
  }

  doCancel() {

  }
}

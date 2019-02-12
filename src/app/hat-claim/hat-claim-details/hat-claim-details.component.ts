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

const ERROR_MESSAGES = {
  authenticationError: 'ERROR: Current password incorrect',
  passwordStrengthError: 'ERROR: Password is too weak. Please make it harder to guess.',
  passwordMatchError: 'Provided passwords do not match'
};

@Component({
  selector: 'rum-hat-claim-details',
  templateUrl: './hat-claim-details.component.html',
  styleUrls: ['./hat-claim-details.component.scss']
})
export class HatClaimDetailsComponent implements OnInit {
  public claimToken: string;
  public successMessage: string;

  public email: string;

  public passwordChanged = false;
  public errorType: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((routeParams) => {
      this.claimToken = routeParams['claimToken'] || null;
    });

    const host = window.location.hostname;

    this.email = 'terry.lee.m@gmail.com - how to get this val';
  }

  errorText(): string {
    return ERROR_MESSAGES[this.errorType] || '';
  }

  clearErrors() {
    this.errorType = '';
    this.successMessage = null;
  }

  doNext() {
    this.router.navigate(['hat', 'claim', 'steps', 'url', this.claimToken])
  }

  doCancel() {

  }
}

/*
 * Copyright (C) 2019 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Terry Lee <terry.lee@hatdex.org> 2, 2019
 */

import { Component, OnInit } from '@angular/core';

const ERROR_MESSAGES = {
  authenticationError: 'ERROR: Current password incorrect',
  passwordStrengthError: 'ERROR: Password is too weak. Please make it harder to guess.',
  passwordMatchError: 'Provided passwords do not match'
};

@Component({
  selector: 'rum-hat-claim-confirmation',
  templateUrl: './hat-claim-confirmation.component.html',
  styleUrls: ['./hat-claim-confirmation.component.scss']
})
export class HatClaimConfirmationComponent implements OnInit {
  public errorType: string;

  constructor() { }

  ngOnInit() { }

  errorText(): string {
    return ERROR_MESSAGES[this.errorType] || '';
  }

}

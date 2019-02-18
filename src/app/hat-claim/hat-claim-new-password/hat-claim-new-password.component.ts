/*
 * Copyright (C) 2019 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Terry Lee <terry.lee@hatdex.org> 2, 2019
 */

import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

declare const zxcvbn: any;

const MIN_PASSWORD_STRENGTH = 3; // Integer from 0-4, see https://github.com/dropbox/zxcvbn for more info
const ERROR_MESSAGES = {
  authenticationError: 'ERROR: Current password incorrect',
  passwordStrengthError: 'ERROR: Password is too weak. Please make it harder to guess.',
  passwordMatchError: 'Provided passwords do not match'
};

@Component({
  selector: 'rum-hat-claim-new-password',
  templateUrl: './hat-claim-new-password.component.html',
  styleUrls: ['./hat-claim-new-password.component.scss']
})
export class HatClaimNewPasswordComponent implements OnInit {
  public colorMapping = ['red', 'red', 'orange', 'green', 'green'];
  public evaluationMapping = ['Too guessable', 'Weak', 'So-so', 'Strong', 'Very Strong'];
  public successMessage: string;
  public passwordStrength: any;
  public errorType: string;

  @Input() hatName: string;
  @Input() hatDomain: string;
  @Output() password = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  errorText(): string {
    return ERROR_MESSAGES[this.errorType] || '';
  }

  clearErrors() {
    this.errorType = '';
    this.successMessage = null;
    this.passwordStrength = null;
  }

  analysePassword(password: string): void {
    this.passwordStrength = zxcvbn(password);
  }

  updatePassword(password: string, newPassword: string): void {
    if (this.passwordIsValid(password, newPassword)) {
      this.password.emit(password);
    }
  }

  passwordIsValid(password: string, newPassword: string): boolean {
    if (password === newPassword) {
      // const passwordStrength = zxcvbn(newPass);
      //
      // if (passwordStrength.score < MIN_PASSWORD_STRENGTH) {
      //   this.errorType = 'passwordStrengthError';
      //
      //   return false;
      // }
      this.errorType = '';

      return true;
    } else {
      this.errorType = 'passwordMatchError';

      return false;
    }
  }
}

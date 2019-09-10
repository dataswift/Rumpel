/*
 * Copyright (C) 2017 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 4, 2017
 */

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'rum-password-recover',
  templateUrl: './password-recover.component.html',
  styleUrls: ['./password-recover.component.scss']
})
export class PasswordRecoverComponent implements OnInit {
  public hatName: string;
  public hatDomain: string;
  public errorMessage: string;
  public successMessage: string;

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
    const host = window.location.hostname;

    this.hatName = host.substring(0, host.indexOf('.'));
    this.hatDomain = host.substring(host.indexOf('.'));
  }

  resetPassword(email: string): void {
    this.authSvc.recoverPassword(email)
      .subscribe(
        (res: any) => {
          this.successMessage = 'If the email address you have entered is correct, you will shortly receive an email'
                              + ' with your password reset instructions.';
        },
        error => {
          console.warn('Failed to recover password. Reason: ', error);
          this.errorMessage = 'ERROR: Failed to submit password recovery request.';
        }
      );
  }

  clearErrors() {
    this.errorMessage = null;
    this.successMessage = null;
  }

}

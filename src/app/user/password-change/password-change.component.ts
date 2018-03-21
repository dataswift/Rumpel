/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 4, 2017
 */

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { PasswordChangeFailureResInterface } from '../password-change-failure-res.interface';

declare const zxcvbn: any;

@Component({
  selector: 'rum-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {
  @ViewChild('currentPass') currentPass: ElementRef;
  public colorMapping = ['red', 'red', 'orange', 'green', 'green'];
  public evaluationMapping = ['Too guessable', 'Weak', 'So-so', 'Strong', 'Very Strong'];
  public resetToken: string;
  public unauthorizedError: boolean;
  public matchError: boolean;
  public strengthError: string;
  public successMessage: string;
  public passwordStrength: any;
  public loadingText: string;
  public hatName: string;
  public hatDomain: string;

  constructor(private route: ActivatedRoute,
              private authSvc: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe((routeParams) => {
      this.resetToken = routeParams['resetToken'] || null;
    });

    const host = window.location.hostname;

    this.hatName = host.substring(0, host.indexOf('.'));
    this.hatDomain = host.substring(host.indexOf('.'));
  }

  clearErrors() {
    this.unauthorizedError = false;
    this.matchError = false;
    this.strengthError = null;
    this.successMessage = null;
    this.passwordStrength = null;
  }

  analysePassword(password: string): void {
    this.passwordStrength = zxcvbn(password);
  }

  changePass(newPass: string, confirmPass: string) {
    if (newPass === confirmPass) {
      const passwordStrength = zxcvbn(newPass);

      if (passwordStrength.score <= 2) {
        this.strengthError = 'ERROR: Password is too weak. Please make it harder to guess.';

        return;
      }

      if (this.resetToken) {
        this.resetPassword(this.resetToken, newPass);
      } else {
        this.changePassword(this.currentPass.nativeElement.value, newPass);
      }
    } else {
      this.matchError = true;
    }
  }

  private changePassword(oldPassword: string, newPassword: string) {
    this.loadingText = 'Saving new password';
    this.authSvc.changePassword(oldPassword, newPassword)
      .subscribe(
        _ => {
          this.loadingText = null;
          this.successMessage = 'Password changed.';
        },
        error => {
          this.loadingText = null;
          if (error.status === 403) {
            this.unauthorizedError = true;
          } else {
            const serverErrorMsg: PasswordChangeFailureResInterface = JSON.parse(error._body);
            this.strengthError = `ERROR: ${serverErrorMsg.message['obj.newPassword'][0].msg[0]}.<br>
            ${serverErrorMsg.message['obj.newPassword'][0].args.join('<br>')}`;
          }
        }
      );
  }

  private resetPassword(resetToken: string, newPassword: string) {
    this.loadingText = 'Saving new password';
    this.authSvc.resetPassword(resetToken, newPassword)
      .subscribe(
        (res: Response) => {
          this.loadingText = null;
          this.successMessage = 'Password reset.';
        },
        error => {
          this.loadingText = null;
          if (error.status === 403) {
            this.unauthorizedError = true;
          } else {
            const serverErrorMsg: PasswordChangeFailureResInterface = JSON.parse(error._body);
            this.strengthError = `ERROR: ${serverErrorMsg.message['obj.newPassword'][0].msg[0]}.<br>
            ${serverErrorMsg.message['obj.newPassword'][0].args.join('<br>')}`;
          }
        }
      );
  }
}

/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 4, 2017
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { UserService } from '../user.service';
import { PasswordChangeFailureResInterface } from '../password-change-failure-res.interface';

declare var zxcvbn: any;

@Component({
  selector: 'rum-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {
  public colorMapping = ['red', 'red', 'orange', 'green', 'green'];
  public evaluationMapping = ['Too guessable', 'Weak', 'So-so', 'Strong', 'Very Strong'];
  public resetToken: string;
  public unauthorizedError: boolean;
  public matchError: boolean;
  public strengthError: string;
  public successMessage: string;
  public passwordStrength: any;
  public loadingText: string;

  constructor(private route: ActivatedRoute,
              private userSvc: UserService) { }

  ngOnInit() {
    this.route.params.subscribe((routeParams) => {
      this.resetToken = routeParams['resetToken'] || null;
    });
  }

  clearErrors() {
    this.unauthorizedError = false;
    this.matchError = false;
    this.strengthError = null;
    this.successMessage = null;
    this.passwordStrength = null;
  }

  analysePassword(form) {
    this.passwordStrength = zxcvbn(form.value.newPassword);
  }

  onSubmit(form) {
    if (form.value.newPassword === form.value.passwordConfirm) {
      const passwordStrength = zxcvbn(form.value.newPassword);

      if (passwordStrength.score <= 2) {
        this.strengthError = 'ERROR: Password is too weak. Please make it harder to guess.';

        return;
      }

      if (this.resetToken) {
        this.resetPassword(this.resetToken, form.value.newPassword);
      } else {
        this.changePassword(form.value.currentPassword, form.value.newPassword);
      }
    } else {
      this.matchError = true;
    }
  }

  private changePassword(oldPassword: string, newPassword: string) {
    this.loadingText = 'Saving new password';
    this.userSvc.changePassword(oldPassword, newPassword)
      .subscribe(
        (res: Response) => {
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
    this.userSvc.resetPassword(resetToken, newPassword)
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

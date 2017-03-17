import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../user.service";

declare var zxcvbn: any;

@Component({
  selector: 'rump-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {
  private resetToken: string;
  private unauthorizedError: boolean;
  private matchError: boolean;
  private strengthError: string;
  private successMessage: string;

  constructor(private route: ActivatedRoute,
              private userSvc: UserService) { }

  ngOnInit() {
    this.route.params.subscribe((routeParams) => {
      this.resetToken = routeParams["resetToken"] || null;
    });
  }

  clearErrors() {
    this.unauthorizedError = false;
    this.matchError = false;
    this.strengthError = null;
    this.successMessage = null;
  }

  onSubmit(form) {
    if (form.value.newPassword === form.value.passwordConfirm) {
      const passwordStrength = zxcvbn(form.value.newPassword);

      if (passwordStrength.score <= 2) {
        this.strengthError =
          `${passwordStrength.feedback.warning}\n\n${passwordStrength.feedback.suggestions}\n\nThe password could be guessed in ${passwordStrength.crack_times_display.online_throttling_100_per_hour}`;
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
    this.userSvc.changePassword(oldPassword, newPassword)
      .subscribe(
        (res: any) => {
          this.successMessage = "Password changed.";
        },
        error => {
          console.warn("Failed to recover password. Reason: ", error);
          if (error.status === 403) {
            this.unauthorizedError = true;
          } else {
            this.strengthError = "ERROR: Failed to request password change.";
          }
        }
      );
  }

  private resetPassword(resetToken: string, newPassword: string) {
    this.userSvc.resetPassword(resetToken, newPassword)
      .subscribe(
        (res: any) => {
          this.successMessage = "Password reset.";
        },
        error => {
          console.warn("Failed to recover password. Reason: ", error);
          if (error.status === 403) {
            this.unauthorizedError = true;
          } else {
            this.strengthError = "ERROR: Failed to request password change.";
          }
        }
      );
  }

}

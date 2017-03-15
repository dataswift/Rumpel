import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../user.service";

@Component({
  selector: 'rump-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {
  private resetToken: string;
  private errorMessage: string;
  private successMessage: string;
  private passwordsMatch: boolean = true;

  constructor(private route: ActivatedRoute,
              private userSvc: UserService) { }

  ngOnInit() {
    this.route.params.subscribe((routeParams) => {
      this.resetToken = routeParams["resetToken"] || null;
    });
  }

  clearErrors() {
    this.errorMessage = null;
    this.successMessage = null;
    this.passwordsMatch = true;
  }

  onSubmit(form) {
    if (form.value.newPassword === form.value.passwordConfirm) {
      if (this.resetToken) {
        this.resetPassword(this.resetToken, form.value.newPassword);
      } else {
        this.changePassword(form.value.oldPassword, form.value.newPassword);
      }
    } else {
      this.passwordsMatch = false;
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
          this.errorMessage = "ERROR: Failed to request password change.";
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
          this.errorMessage = "ERROR: Failed to request password reset.";
        }
      );
  }

}

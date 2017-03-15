import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";

@Component({
  selector: 'rump-password-recover',
  templateUrl: './password-recover.component.html',
  styleUrls: ['./password-recover.component.scss']
})
export class PasswordRecoverComponent implements OnInit {
  private errorMessage: string;
  private successMessage: string;

  constructor(private userSvc: UserService) { }

  ngOnInit() {
  }

  onSubmit(form: any): void {
    this.userSvc.recoverPassword(form.value.recoveryEmail)
      .subscribe(
        (res: any) => {
          this.successMessage = "If the email address you have entered is correct, you will shortly receive an email with your password reset instructions."
        },
        error => {
          console.warn("Failed to recover password. Reason: ", error);
          this.errorMessage = "ERROR: Failed to submit password recovery request.";
        }
      )
  }

  clearErrors() {
    this.errorMessage = null;
    this.successMessage = null;
  }

}

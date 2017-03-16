import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'rump-login-hat',
  templateUrl: './login-hat.component.html',
  styleUrls: ['./login-hat.component.scss']
})
export class LoginHatComponent implements OnInit {
  private errorMessage: string;

  constructor(private userSvc: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .flatMap((queryParams) => {
        console.log(queryParams);
        const name = queryParams["name"] || "";
        const redirect = queryParams["redirect"] || "";

        return this.userSvc.hatLogin(name, redirect);
      })
      .subscribe(
        (redirectUrl: string) => {
          window.location.href = redirectUrl;
        },
        error => {
          console.warn("Failed to login. Reason: ", error);
          this.errorMessage = "ERROR: Failed to obtain HAT authentication. Please try again.";
        }
      )
  }

}

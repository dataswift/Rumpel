import { Component, OnInit } from '@angular/core';
import { FormBuilder, ControlGroup, Validators } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  moduleId: module.id,
  selector: 'rump-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: ControlGroup;
  wrongPassword: Boolean = false;

  constructor(private _formBuilder: FormBuilder,
              private _router: Router,
              private _authService: AuthService) {}

  ngOnInit(): any {
    this.loginForm = this._formBuilder.group({
      hat: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(form) {
    const fv = form.value;
    if (this._authService.doLogin(fv.hat, fv.username, fv.password)) {
      this._router.navigate(['/']);
    } else {
      this.wrongPassword = true;
    }
  }

}

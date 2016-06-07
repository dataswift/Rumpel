import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AuthService {

  private authenticated: Boolean = false;
  private token: String = "";
  private userInfo = {};

  constructor(private _http: Http) {
  }

  isAuthenticated() {
    return this.authenticated;
  }

}

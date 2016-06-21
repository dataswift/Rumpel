import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
  private _authenticated: boolean = false;
  private _token: string;
  private _hat: string;
  private _jwtHelper: JwtHelper = new JwtHelper();

  constructor(private _http: Http) {
  }

  decodeJwt(jwt: string) {
    this._token = jwt;
    const jwtData = this._jwtHelper.decodeToken(jwt);
    this._hat = jwtData['iss'];
  }

  isAuthenticated() {
    return this._authenticated;
  }

}

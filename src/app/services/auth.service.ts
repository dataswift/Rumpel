import { Injectable } from '@angular/core';
import { HatApiService } from './hat-api.service';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
  private _authenticated: boolean = false;
  private _jwtHelper: JwtHelper = new JwtHelper();

  constructor(private _hatApi: HatApiService) {
  }

  decodeJwt(jwt: string) {
    const jwtData = this._jwtHelper.decodeToken(jwt);
    const hatAddress = jwtData['iss'];

    this._hatApi.validateToken(hatAddress, jwt).subscribe(res => {
      if (res && res.message === 'Authenticated') this._authenticated = true;
      else this._authenticated = false;
    });
  }

  isAuthenticated() {
    return this._authenticated;
  }

}

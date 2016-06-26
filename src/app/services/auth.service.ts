import { Injectable } from '@angular/core';
import { HatApiService } from './hat-api.service';
import { JwtHelper } from 'angular2-jwt';
import { Observable, Observer } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  public auth$: Observable<any>;
  private authObserver: Observer<any>;
  private _authenticated: boolean = false;
  private _jwtHelper: JwtHelper = new JwtHelper();

  constructor(private _hatApi: HatApiService) {
    this.auth$ = new Observable(observer => this.authObserver = observer).share();
  }

  decodeJwt(jwt: string) {
    const jwtData = this._jwtHelper.decodeToken(jwt);
    const hatDomain = jwtData['iss'];

    this._hatApi.validateToken(hatDomain, jwt).subscribe(
      res => {
      if (res && res.message === 'Authenticated') this._authenticated = true;
      else this._authenticated = false;
      },
      err => {
        this._authenticated = false;
        console.log("Could not verify with specified HAT");
      },
      () => this.authObserver.next(this._authenticated));
  }

  isAuthenticated(): boolean {
    return this._authenticated;
  }

}

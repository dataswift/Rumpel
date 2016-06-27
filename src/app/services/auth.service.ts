import { Injectable } from '@angular/core';
import { HatApiService } from './hat-api.service';
import { JwtHelper } from 'angular2-jwt';
import { Observable, Observer } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  public auth$: Observable<any>;
  private authObserver: Observer<any>;
  private authenticated: boolean;
  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(private _hatApi: HatApiService) {
    this.auth$ = new Observable(observer => this.authObserver = observer).share();

    const storedToken = localStorage.getItem('hatat');
    if (storedToken) this.authenticate(storedToken);
  }

  decodeJwt(jwt: string): string {
    const jwtData = this.jwtHelper.decodeToken(jwt);
    const issuer = jwtData['iss'];
    return issuer;
  }

  authenticate(jwt: string) {
    const hatDomain = this.decodeJwt(jwt);
    this._hatApi.validateToken(hatDomain, jwt).subscribe(
      res => {
        if (res && res.message === 'Authenticated') {
          this.authenticated = true;
          localStorage.setItem('hatat', jwt);
        } else {
          this.authenticated = false;
          localStorage.removeItem('hatat');
        }
      },
      err => {
        this.authenticated = false;
        console.log("Could not verify with specified HAT");
      },
      () => {
        if (this.authObserver) this.authObserver.next(this.authenticated);
      });
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  /* Local Storage placeholders */

  // static getCookie(name: string): string {
  //   return localStorage.getItem(name);
  // }

  // static setCookie(name: string, value: string) {
  //   localStorage.setItem(name, value);
  // }

}

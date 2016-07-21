import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Subject, Observable } from 'rxjs/Rx';
import { HatApiService } from './hat-api.service';

@Injectable()
export class AuthService {
  private auth$: Subject<any>;
  private authenticated: boolean;
  private jwtHelper: JwtHelper;
  private hatDomain: string;

  constructor(private hat: HatApiService) {
    this.auth$ = <Subject<any>>new Subject();
    this.authenticated = false;
    this.jwtHelper = new JwtHelper();
  }

  decodeJwt(jwt: string): string {
    const jwtData = this.jwtHelper.decodeToken(jwt);
    const issuer = jwtData['iss'];
    return issuer;
  }

  isPreviousTokenValid(): boolean {
    const storedToken = localStorage.getItem('hat-at');

    if (storedToken && (!this.jwtHelper.isTokenExpired(storedToken))) {
      this.hat.updateCredentials(this.decodeJwt(storedToken), storedToken);
      this.authenticated = true;
      this.hatDomain = this.decodeJwt(storedToken);
      this.auth$.next(this.authenticated);
      return true;
    } else {
      if (storedToken) localStorage.removeItem('hat-at');
      return this.authenticated = false;
    }
  }

  authenticate(jwt: string) {
    const hatDomain = this.decodeJwt(jwt);
    this.hatDomain = hatDomain;

    this.hat.validateToken(hatDomain, jwt).subscribe(
      res => {
        if (res && res.message === 'Authenticated') {
          this.authenticated = true;
          localStorage.setItem('hat-at', jwt);
        } else {
          this.authenticated = false;
          localStorage.removeItem('hat-at');
        }
      },
      err => {
        this.authenticated = false;
        console.log("Could not verify with specified HAT");
        this.auth$.next(this.authenticated);
      },
      () => {
        this.auth$.next(this.authenticated);
      });
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getDomain(): string {
    return this.hatDomain;
  }

  getAuth$() {
    return this.auth$.asObservable();
  }

  signOut() {
    this.authenticated = false;
    this.hatDomain = null;
    localStorage.removeItem('hat-at');
  }

  /* Local Storage placeholders */

  // static getCookie(name: string): string {
  //   return localStorage.getItem(name);
  // }

  // static setCookie(name: string, value: string) {
  //   localStorage.setItem(name, value);
  // }

}

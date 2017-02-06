import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Subject, Observable, ReplaySubject } from 'rxjs/Rx';
import { CookieService } from 'angular2-cookie/core';
import { HatApiService } from './hat-api.service';
import { MarketSquareService } from '../market-square/market-square.service';
import { User } from '../shared/interfaces/index';

@Injectable()
export class UserService {

  private _user: User;
  private _auth$: Subject<boolean> = <Subject<boolean>>new Subject();
  private _user$: ReplaySubject<User> = <ReplaySubject<User>>new ReplaySubject();
  private _jwtHelper: JwtHelper = new JwtHelper();

  constructor(private _hat: HatApiService,
              private cookieSvc: CookieService,
              private _marketSquare: MarketSquareService) {

    this._hat.injectUserSubscription(this._user$.asObservable());
  }

  login(jwt: string) {
    const payload = this._jwtHelper.decodeToken(jwt);
    const hatDomain = payload['iss'];

    this._user = payload;
    this._user.token = jwt;

    this._hat.validateToken(hatDomain, jwt).subscribe(
      res => {
        if (res.message === 'Authenticated') {
          this.cookieSvc.put("lastLoginPHATA", hatDomain);
          this.cookieSvc.put("lastLoginToken", this._user.token);
          this._user.authenticated = true;
          this._auth$.next(true);
          this.publishUser();
          this._marketSquare.connectHAT();
        } else {
          this._user.authenticated = false;
          this._auth$.next(false);
          this.cookieSvc.remove("lastLoginToken");
        }
      }
    )
  }

  logout() {
    this._user = {
      sub: '',
      resource: '',
      accessScope: '',
      iss: '',
      client: '',
      exp: 0,
      authenticated: false,
      token: ''
    };

    this.cookieSvc.remove("lastLoginToken");
    this._auth$.next(false);
    this.publishUser();
  }

  ensureUserAuthenticated() {
    if (this._user && this._user.token) {
      this._auth$.next(true);
    } else {
      const previousToken: string = this.cookieSvc.get("lastLoginToken");

      if (previousToken && !this._jwtHelper.isTokenExpired(previousToken)) {
        const payload = this._jwtHelper.decodeToken(previousToken);
        this.cookieSvc.put("lastLoginPHATA", payload["iss"]);

        this._user = payload;
        this._user.token = previousToken;
        this._user.authenticated = true;

        this._auth$.next(true);
        this.publishUser();
      } else if (previousToken && this._jwtHelper.isTokenExpired(previousToken)) {
        this.cookieSvc.remove("lastLoginToken");
        this._auth$.next(false);
      } else {
        this._auth$.next(false);
      }
    }
  }

  get user$(): Observable<User> {
    return this._user$.asObservable();
  }

  get auth$(): Observable<boolean> {
    return this._auth$.asObservable();
  }

  private publishUser(): void {
    this._user$.next(this._user);
  }

}

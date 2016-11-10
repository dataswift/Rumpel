import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Subject, Observable } from 'rxjs/Rx';
import { HatApiService } from './hat-api.service';
import { MarketSquareService } from '../market-square/market-square.service';
import { User } from '../shared/interfaces/index';

@Injectable()
export class UserService {

  private _user: User;
  private _user$: Subject<User>;
  private _jwtHelper: JwtHelper;

  constructor(private _hat: HatApiService,
              private _marketSquare: MarketSquareService) {
    this._user$ = <Subject<User>>new Subject();
    this._jwtHelper = new JwtHelper();
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

    this._hat.setUserSubscription(this._user$.asObservable());
  }

  login(jwt: string) {
    const payload = this._jwtHelper.decodeToken(jwt);
    const hatDomain = payload['iss'];

    this._user = payload;
    this._user.authenticated = false;
    this._user.token = jwt;

    this._hat.validateToken(hatDomain, jwt).subscribe(
      res => {
        if (res.message === 'Authenticated') {
          this._user.authenticated = true;
          localStorage.setItem('token', jwt);
          this._marketSquare.connectHAT(hatDomain);
        }

        this.publishUser();
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

    localStorage.removeItem('token');
    this.publishUser();
  }

  isAuthenticated() {
    if (this._user.authenticated === false) {
      const storedToken = localStorage.getItem('token');

      if (storedToken && (!this._jwtHelper.isTokenExpired(storedToken))) {
        const payload = this._jwtHelper.decodeToken(storedToken);

        this._user = payload;
        this._user.authenticated = true;
        this._user.token = storedToken;
      } else if (storedToken && this._jwtHelper.isTokenExpired(storedToken)) {
        localStorage.removeItem('token');
      }
    }

    this.publishUser();
  }

  get user$() {
    return this._user$.asObservable();
  }

  private publishUser(): void {
    this._user$.next(this._user);
  }

}

import { Injectable } from '@angular/core';
import { Subject, Observable, ReplaySubject } from 'rxjs/Rx';
import { HatApiService } from '../services/hat-api.service';
import { User } from './user.interface';
import { AuthHttp } from "../services/auth-http.service";

@Injectable()
export class UserService {
  private _auth$: Subject<boolean> = <Subject<boolean>>new Subject();
  private _user$: ReplaySubject<User> = <ReplaySubject<User>>new ReplaySubject();

  constructor(private hatSvc: HatApiService,
              private authHttp: AuthHttp) {
  }

  isLoggedIn(): boolean {
    const user: User = this.authHttp.hasValidToken;
    this._user$.next(user);
    return user.authenticated;
  }

  loginWithToken(token: string): boolean {
    const user: User = this.hatSvc.loginWithToken(token);
    this._user$.next(user);

    return user.authenticated;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.hatSvc.login(username, password)
      .map((user: User) => {
        this._user$.next(user);

        return user.authenticated;
      });
  }

  logout(): void {
    this._user$.next({
      hatId: null,
      domain: null,
      fullDomain: null,
      authenticated: false
    });

    this.authHttp.removeToken();
  }


  get user$(): Observable<User> {
    return this._user$.asObservable();
  }

  get auth$(): Observable<boolean> {
    return this._auth$.asObservable();
  }

}

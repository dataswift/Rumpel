import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AuthService {

  private authenticated: Boolean = false;
  private token: String = "";
  private userInfo = { hat: '', username: '', token: '' };

  constructor(private _http: Http) {
  }

  doLogin(hat, username, password) {
    if (username === password) {
      console.log('Authenticated');
      this.authenticated = true;
      this.userInfo.hat = hat;
      this.userInfo.username = username;
      this.userInfo.token = 'aaaaaaaaaa';
    } else {
      console.log('Could not authenticate');
      this.authenticated = false;
    }

    return this.authenticated;
  }

  isAuthenticated() {
    return this.authenticated;
  }

}

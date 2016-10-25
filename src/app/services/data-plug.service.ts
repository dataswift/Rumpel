import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { HatApiService } from './hat-api.service';
import { Observable } from "rxjs";

@Injectable()
export class DataPlugService {

  constructor(private http: Http,
              private hat: HatApiService) { }

  getFacebookTokenInfo() {
    return this.hat.getApplicationToken('Facebook', 'https://social-plug.hubofallthings.com')
      .flatMap(accessToken => {
        let url = 'https://social-plug.hubofallthings.com/api/user/token/status';
        let headers = new Headers();
        headers.append('X-Auth-Token', accessToken);
        headers.append('Content-Type', 'application/json');

        return this.http.get(url, { headers: headers, body: '' })
          .map(res => res.json())
      })
      .catch(err => {
        return Observable.of({ error: err.json().error });
      });
  }
}

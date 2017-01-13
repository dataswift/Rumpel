import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { HatApiService } from './hat-api.service';
import { Observable } from "rxjs";

@Injectable()
export class DataPlugService {
  private serviceURLmap: { [key: string]: string; } = {
    'Facebook': 'https://social-plug.hubofallthings.com',
    'Twitter': 'https://twitter-plug.hubofallthings.com'
  };

  constructor(private http: Http,
              private hat: HatApiService) { }

  getTokenInfo(plugName: string) {
    return this.hat.getApplicationToken(plugName, this.serviceURLmap[plugName])
      .flatMap(accessToken => {
        let url = this.serviceURLmap[plugName] + '/api/user/token/status';
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

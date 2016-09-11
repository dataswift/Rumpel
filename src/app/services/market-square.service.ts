import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HatApiService } from './hat-api.service';

@Injectable()
export class MarketSquareService {
  private baseUrl: string;
  private market: { id: string; accessToken: string };
  private _headers: Headers;

  constructor(private http: Http, private hat: HatApiService) {
    this.baseUrl = 'https://marketsquare.hubofallthings.com/api';
    this.market = {
      id: 'b6673e46-9246-4135-905e-c275e01e6b5d',
      accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyLURFcWJpNWlBbHR0QTUyZkhaaDJsU21ockdmQkRaZVQ2VWt5MXZZY3dWTGFUN3prakk1bGlcL2J3bHkrMlYrUTh3UDdabTVNaXE3OU1uOVRuUlNGWlJPbjYzZHhmc0tyRjQ4U1d5enJVPSIsImRhdGFwbHVnIjoiYjY2NzNlNDYtOTI0Ni00MTM1LTkwNWUtYzI3NWUwMWU2YjVkIiwiaXNzIjoiaGF0LW1hcmtldCIsImV4cCI6MTUwNDA4MjE1OCwiaWF0IjoxNDczMzIzNzU4LCJqdGkiOiIwMThiMjZkMzBjOThkNGYzNWYwY2I1NDk4MzA4M2Y5NTJlODQ1Zjc2MWMxNDBhYmY3YWJkOGYyYjU3MzA4ZTZhNjc5M2FkYmRmOGJkZTAxY2MxODE3NzBiOWUxNjY5YjkyMDg1NzMyNTZiMzk0NjRhOTZlMjJhN2FjMmU0YWExM2JmNzgwZWNmOTgzODU2N2JiYjBmOTgxMzc1MTVlM2Y2MDdlODY0YmM3ODQyZjc0MzI3MzlhNjhmYzdhNGQwN2Q2NmZhOGZmOGE1MzMxY2YxYjRiZjUyMWM5ZDJmNjdhMjdhNmJiMzMyMjdmNTliMWU0MWNiZDYzMmU3NzkxYThlIn0.Y93Ap0zSc8FQOEslCR2eBTg9GURXSruA-5E36NHP450'
    };
    this._headers = new Headers();
    this._headers.append('Content-Type', 'application/json');
  }

  getOffer(): Observable<any> {
    const url = this.baseUrl + '/offers';
    return this.http.get(url, { headers: this._headers, body: '' })
        .map(res => res.json())
        .map(offers => {
          const validOffers = offers.filter(offer => offer.offer.status === 'approved' || offer.offer.status === 'satisfied');
          return validOffers.sort((a, b) => b.offer.rating.up - a.offer.rating.up);
        });
  }

  getDataPlugs(): Observable<any> {
    const url = this.baseUrl + '/dataplugs';
    return this.http.get(url, { headers: this._headers, body: '' })
      .map(res => res.json());
  }

  /*
   * Registers Rumpel as an active data plug with MarketSquare
   */

  connectHAT() {
    const hatDomain = this.hat.getDomain();
    const url = this.baseUrl + '/dataplugs/' + this.market.id + '/connect';

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Auth-Token', this.market.accessToken);

    let query = new URLSearchParams();
    query.append('hat', hatDomain);

    this.http.get(url, { headers: headers, search: query, body: '' })
      .map(res => res.json())
      .subscribe(registrationMessage => {
        if (registrationMessage.error) {
          console.log('Failed to register with MarketSquare.');
        } else if (registrationMessage.message) {
          console.log('Successfully registered with MarketSquare.', registrationMessage.message);
        }
      });
  }
}

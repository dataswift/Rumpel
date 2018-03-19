/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Injectable, Inject } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpBackendClient } from '../core/services/http-backend-client.service';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AuthService } from '../core/services/auth.service';
import { User } from '../user/user.interface';
import { LocationsService } from '../locations/locations.service';

import { APP_CONFIG, AppConfig} from '../app.config';
import { DataPlug } from '../shared/interfaces/data-plug.interface';
import { HatApiService } from '../core/services/hat-api.service';
import { DexApiService } from '../services/dex-api.service';

import * as moment from 'moment';
import { Moment } from 'moment';

// TODO: replace with fetch from DEX when going to production
// TODO: re-implement user notification in cases when active plug started failing

@Injectable()
export class DataPlugService {
  private hatUrl: string;
  private plugs: DataPlug[];
  private expires: Moment = moment().subtract(10, 'seconds');
  private _dataplugs$: ReplaySubject<DataPlug[]> = <ReplaySubject<DataPlug[]>>new ReplaySubject(1);

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
              private http: HttpBackendClient,
              private hatSvc: HatApiService,
              private dexSvc: DexApiService,
              private authSvc: AuthService,
              private locationsSvc: LocationsService) {

    this.authSvc.user$
      .filter((user: User) => Boolean(user.fullDomain))
      .subscribe((user: User) => {
        this.hatUrl = user.fullDomain;
        this.getDataPlugList();
      });
  }

  get dataplugs$(): Observable<DataPlug[]> {
    return this._dataplugs$.asObservable();
  }

  get inactiveDataplugs$(): Observable<DataPlug[]> {
    return this.dataplugs$.map((plugs: DataPlug[]) => plugs.filter(plug => !plug.active));
  }

  get notablesEnabledPlugs$(): Observable<DataPlug[]> {
    return this.dataplugs$
      .map((dps: DataPlug[]) => {
        return dps.filter((plug: DataPlug) => plug.name.toLowerCase() === 'facebook' || plug.name.toLowerCase() === 'twitter');
      })
      .defaultIfEmpty([]);
  }

  getTokenInfo(plugName: string, baseUrl: string): Observable<boolean> {
    return this.hatSvc.getApplicationToken(plugName, baseUrl)
      .flatMap(accessToken => {
        const url = `${baseUrl}/api/status`;
        const headers = new HttpHeaders()
          .set('X-Auth-Token', accessToken)
          .set('Content-Type', 'application/json');

        return this.http.get<any>(url, { headers: headers, observe: 'response' })
          .map(res => res.status === 200)
          .catch(err => Observable.of(false));
      });
  }

  getPlugRedirectUrl(plugName: string, baseUrl: string): Observable<string> {
    return this.hatSvc.getApplicationToken(plugName, baseUrl)
      .map((accessToken: string) => `${baseUrl}/authenticate/hat?token=${accessToken}`);
  }

  private getDataPlugList(): void {
    if (this.expires.isBefore()) {
      this.dexSvc.getAvailablePlugList().subscribe((plugs: DataPlug[]) => {
        this.plugs = plugs;
        this.expires = moment().add(10, 'minutes');

        this.plugs.forEach(plug => {
          if (plug.name === 'Locations') {
            this.locationsSvc.checkTableExists().subscribe(isActive => {
              plug.active = isActive;
              this._dataplugs$.next(this.plugs);
            });
          } else {
            this.getTokenInfo(plug.name, plug.url).subscribe(isActive => {
              plug.active = isActive;
              this._dataplugs$.next(this.plugs);
            });
          }
        });
      });
    }
  }
}

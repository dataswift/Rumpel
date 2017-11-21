/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { UserService } from '../user/user.service';
import { User } from '../user/user.interface';
import { LocationsService } from '../locations/locations.service';

import { APP_CONFIG, AppConfig} from '../app.config';
import { DataPlug } from '../shared/interfaces/data-plug.interface';
import { HatApiV2Service } from '../services/hat-api-v2.service';
import { DexApiService } from '../services/dex-api.service';

// TODO: replace with fetch from DEX when going to production

@Injectable()
export class DataPlugService {
  private hatUrl: string;
  private plugs: DataPlug[];
  private _dataplugs$: ReplaySubject<DataPlug[]> = <ReplaySubject<DataPlug[]>>new ReplaySubject(1);
  private twitterPlugWarningShown = false;
  private facebookPlugWarningShown = false;

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
              private http: Http,
              private hatSvc: HatApiV2Service,
              private dexSvc: DexApiService,
              private userSvc: UserService,
              private locationsSvc: LocationsService) {

    this.userSvc.user$
      .filter((user: User) => user.authenticated === true)
      .subscribe((user: User) => {
        this.hatUrl = user.fullDomain;
        this.getDataPlugList();
      });
  }

  get dataplugs$(): Observable<DataPlug[]> {
    return this._dataplugs$.asObservable();
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
        const headers = new Headers();
        headers.append('X-Auth-Token', accessToken);
        headers.append('Content-Type', 'application/json');

        return this.http.get(url, { headers: headers })
          .map(res => res.status === 200)
          .catch(err => Observable.of(false));
      });
  }

  getPlugRedirectUrl(plugName: string, baseUrl: string): Observable<string> {
    return this.hatSvc.getApplicationToken(plugName, baseUrl)
      .map((accessToken: string) => `${baseUrl}/authenticate/hat?token=${accessToken}`);
  }

  private getDataPlugList() {
    this.dexSvc.getAvailablePlugList().subscribe((plugs: DataPlug[]) => {
      this.plugs = plugs;

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

  // TODO: re-implement user notification in cases when active plug started failing

  // private getFacebookStatus(): void {
  //   this.getTokenInfo('Facebook').subscribe(
  //     tokenInfo => {
  //       this.services['Facebook'].connected = tokenInfo.canPost;
  //       if (tokenInfo.canPost === false && this.facebookPlugWarningShown === false) {
  //         this.facebookPlugWarningShown = true;
  //         this.dialogSvc.createDialog<DialogBoxComponent>(DialogBoxComponent, {
  //           title: 'Reconnect your Facebook plug',
  //           message: `Every two months, you need to reset your Facebook plug – it's our way of checking that ` +
  //                    `you're still happy to pull this data into your HAT.`,
  //           cancelBtnText: 'No Thanks',
  //           icon: 'assets/icons/facebook-f-icon.svg',
  //           buttons: [{
  //             title: 'Reconnect Facebook Plug',
  //             link: `//${this.hatUrl}/#/hatlogin?` +
  //                   `name=Facebook&redirect=https://social-plug.hubofallthings.com/hat/authenticate/`
  //           }]
  //         });
  //       }
  //     },
  //     error => {
  //       this.services['Facebook'].connected = false;
  //       if (error.url.includes(window.location.hostname)) {
  //         console.warn('Retrieving application token for the Facebook plug is broken.');
  //       } else {
  //         this.uiSvc.tables$.subscribe((tables: DataTable[]) => {
  //           const tableFound = tables.find(table => table.name === 'posts' && table.source === 'facebook');
  //
  //           if (tableFound && this.facebookPlugWarningShown === false) {
  //             this.facebookPlugWarningShown = true;
  //             this.dialogSvc.createDialog<DialogBoxComponent>(DialogBoxComponent, {
  //               title: 'Something went wrong',
  //               message: 'There is a problem with your Facebook plug. If the problem persists, we suggest ' +
  //                        'disconnecting and re-connecting the plug.',
  //               icon: 'assets/icons/facebook-f-icon.svg',
  //               cancelBtnText: 'Dismiss',
  //               buttons: [{
  //                 title: 'Reconnect Facebook Plug',
  //                 link: `//${this.hatUrl}/#/hatlogin?` +
  //                       `name=Facebook&redirect=https://social-plug.hubofallthings.com/hat/authenticate/`
  //               }]
  //             });
  //           }
  //         });
  //       }
  //     }
  //   );
  // }
  //
  // private getTwitterStatus(): void {
  //   this.getTokenInfo('Twitter').subscribe(
  //     tokenInfo => {
  //       this.services['Twitter'].connected = true;
  //     },
  //     error => {
  //       this.services['Twitter'].connected = false;
  //       if (error.url.includes(window.location.hostname)) {
  //         console.warn('Retrieving application token for the Twitter plug is broken.');
  //       } else {
  //         this.uiSvc.tables$.subscribe((tables: DataTable[]) => {
  //           const tableFound = tables.find(table => table.name === 'tweets' && table.source === 'twitter');
  //
  //           // If Twitter plug status endpoint gives HTTP error but table exists on the HAT => problem occurred
  //           // If the table hasn't been created => plug is not set up, all ok
  //           if (tableFound && this.dialogSvc.activeInstances === 0 && this.twitterPlugWarningShown === false) {
  //             this.twitterPlugWarningShown = true;
  //             this.dialogSvc.createDialog<DialogBoxComponent>(DialogBoxComponent, {
  //               title: 'Something went wrong',
  //               icon: 'assets/icons/twitter-icon.svg',
  //               message: 'There is a problem with your Twitter plug. If the problem persists, we suggest ' +
  //                        'disconnecting and re-connecting the plug.',
  //               cancelBtnText: 'Dismiss',
  //               buttons: [{
  //                 title: 'Reconnect Twitter Plug',
  //                 link: `//${this.hatUrl}/#/hatlogin?` +
  //                       `name=Twitter&redirect=https://twitter-plug.hubofallthings.com/authenticate/hat/`
  //               }]
  //             });
  //           }
  //         });
  //       }
  //     }
  //   );
  // }

}

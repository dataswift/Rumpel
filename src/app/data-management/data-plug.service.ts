/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { HatApiService } from '../services/hat-api.service';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { DialogService } from '../layout/dialog.service';
import { DialogBoxComponent } from '../layout/dialog-box/dialog-box.component';
import { UiStateService } from '../services/ui-state.service';
import { DataTable } from '../shared/interfaces/data-table.interface';
import { UserService } from '../user/user.service';
import { User } from '../user/user.interface';
import { MarketSquareService } from '../market-square/market-square.service';
import { LocationsService } from '../locations/locations.service';

import { APP_CONFIG, IAppConfig} from '../app.config';

@Injectable()
export class DataPlugService {
  private hatUrl: string;
  private services: { [key: string]: { url: string; connected: boolean; }; };
  private _dataplugs$: ReplaySubject<any> = <ReplaySubject<any>>new ReplaySubject(1);
  private locationData = false;
  private twitterPlugWarningShown = false;
  private facebookPlugWarningShown = false;

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              private http: Http,
              private hatSvc: HatApiService,
              private marketSvc: MarketSquareService,
              private dialogSvc: DialogService,
              private uiSvc: UiStateService,
              private userSvc: UserService,
              private locationsSvc: LocationsService) {
    this.services = {
      'Facebook': {
        url: 'https://social-plug.hubofallthings.com/api/user/token/status',
        connected: false
      },
      'Twitter': {
        url: 'https://twitter-plug.hubofallthings.com/api/status',
        connected: false
      }
    };

    this.userSvc.user$
      .filter((user: User) => user.authenticated === true)
      .subscribe((user: User) => {
        // console.log(user);
        this.hatUrl = user.fullDomain;
        this.getFacebookStatus();
        this.getTwitterStatus();
      });

    this.getDataPlugList();
  }

  get dataplugs$(): Observable<any> {
    return this._dataplugs$.asObservable();
  }

  status(plugName: string): boolean {
    console.log(this.services[plugName[0].toUpperCase() + plugName.slice(1)]);

    return this.services[plugName[0].toUpperCase() + plugName.slice(1)].connected;
  }

  getTokenInfo(plugName: string): Observable<any> {
    return this.hatSvc.getApplicationToken(plugName, this.services[plugName].url)
      .flatMap(accessToken => {
        const url = this.services[plugName].url;
        const headers = new Headers();
        headers.append('X-Auth-Token', accessToken);
        headers.append('Content-Type', 'application/json');

        return this.http.get(url, { headers: headers, body: '' })
          .map(res => res.json());
      });
  }

  private getDataPlugStatus(tables, plug): boolean {
    const plugStatus = false;

    const plugList: any = this.config.menuItems.dataPlugs;
    const plugName = plug.name.toLowerCase();

    // for (let i = 0; i < plugList.length; i++) {
    //   if (plugName === plugList[i].display.toLowerCase()) {
    //     plugStatus = this.eventsSvc.checkTableExists(plugList[i].activatedSearchName, plugList[i].activatedSearchSource);
    //   } else if (plugName === 'photos' && plugList[i].display === 'Dropbox photos') {
    //     plugStatus = this.eventsSvc.checkTableExists(plugList[i].activatedSearchName, plugList[i].activatedSearchSource);
    //   }
    // }

    return plugStatus;
  }

  private getDataPlugLink(plug): string {
    const plugList: any = this.config.menuItems.dataPlugs;
    let link = '';

    const plugName = plug.name.toLowerCase();
    for (let i = 0; i < plugList.length; i++) {
      if (plugName === plugList[i].display.toLowerCase()) {
        link = plugList[i].page;
      }
    }

    return link;
  }


  private getDataPlugList() {
    this.locationsSvc.data$.subscribe(locations => {
      if (locations.length > 0) {
        this.locationData = true;
      } else {
        this.locationData = false;
      }

      this.marketSvc.getDataPlugs().subscribe(plugs => {

        this.uiSvc.tables$.subscribe((tables: DataTable[]) => {

          const displayPlugs = plugs.map(plug => {

            let plugActivated: boolean;

            if ( plug.name === 'location' ) {
              plugActivated = this.locationData;
            } else {
              plugActivated = this.getDataPlugStatus(tables, plug);
            }

            let plugName: string = plug.name;
            if (plugName.toLowerCase() === 'photos') {
              plugName = 'Dropbox photos';
            }

            let plugIcon: string = plug.name.toLowerCase() + '-plug.svg';
            if (plugName === 'Calendar') {
              plugIcon = 'calendar-plug.png';
            }

            if (plugName === 'Dropbox photos') {
              plugIcon = 'dropbox-photos-plug.svg';
            }

            plug.name = plugName;

            const displayPlug = {
              name: plugName,
              description: plug.description,
              url: plug.url.replace('/dataplug', '/hat/authenticate'),
              icon: plugIcon,
              activated: plugActivated,
              page: this.getDataPlugLink(plug)
            };

            return displayPlug;
          }).sort((p1, p2) => p1.name > p2.name ? 1 : -1);

          this._dataplugs$.next(displayPlugs);
        });


      });
    });


  }

  private getFacebookStatus(): void {
    this.getTokenInfo('Facebook').subscribe(
      tokenInfo => {
        this.services['Facebook'].connected = tokenInfo.canPost;
        if (tokenInfo.canPost === false && this.facebookPlugWarningShown === false) {
          this.facebookPlugWarningShown = true;
          this.dialogSvc.createDialog<DialogBoxComponent>(DialogBoxComponent, {
            title: 'Reconnect your Facebook plug',
            message: `Every two months, you need to reset your Facebook plug – it's our way of checking that ` +
                     `you're still happy to pull this data into your HAT.`,
            cancelBtnText: 'No Thanks',
            icon: 'assets/icons/facebook-f-icon.svg',
            buttons: [{
              title: 'Reconnect Facebook Plug',
              link: `//${this.hatUrl}/#/hatlogin?` +
                    `name=Facebook&redirect=https://social-plug.hubofallthings.com/hat/authenticate/`
            }]
          });
        }
      },
      error => {
        this.services['Facebook'].connected = false;
        if (error.url.includes(window.location.hostname)) {
          console.warn('Retrieving application token for the Facebook plug is broken.');
        } else {
          this.uiSvc.tables$.subscribe((tables: DataTable[]) => {
            const tableFound = tables.find(table => table.name === 'posts' && table.source === 'facebook');

            if (tableFound && this.facebookPlugWarningShown === false) {
              this.facebookPlugWarningShown = true;
              this.dialogSvc.createDialog<DialogBoxComponent>(DialogBoxComponent, {
                title: 'Something went wrong',
                message: 'There is a problem with your Facebook plug. If the problem persists, we suggest ' +
                         'disconnecting and re-connecting the plug.',
                icon: 'assets/icons/facebook-f-icon.svg',
                cancelBtnText: 'Dismiss',
                buttons: [{
                  title: 'Reconnect Facebook Plug',
                  link: `//${this.hatUrl}/#/hatlogin?` +
                        `name=Facebook&redirect=https://social-plug.hubofallthings.com/hat/authenticate/`
                }]
              });
            }
          });
        }
      }
    );
  }

  private getTwitterStatus(): void {
    this.getTokenInfo('Twitter').subscribe(
      tokenInfo => {
        this.services['Twitter'].connected = true;
      },
      error => {
        this.services['Twitter'].connected = false;
        if (error.url.includes(window.location.hostname)) {
          console.warn('Retrieving application token for the Twitter plug is broken.');
        } else {
          this.uiSvc.tables$.subscribe((tables: DataTable[]) => {
            const tableFound = tables.find(table => table.name === 'tweets' && table.source === 'twitter');

            // If Twitter plug status endpoint gives HTTP error but table exists on the HAT => problem occurred
            // If the table hasn't been created => plug is not set up, all ok
            if (tableFound && this.dialogSvc.activeInstances === 0 && this.twitterPlugWarningShown === false) {
              this.twitterPlugWarningShown = true;
              this.dialogSvc.createDialog<DialogBoxComponent>(DialogBoxComponent, {
                title: 'Something went wrong',
                icon: 'assets/icons/twitter-icon.svg',
                message: 'There is a problem with your Twitter plug. If the problem persists, we suggest ' +
                         'disconnecting and re-connecting the plug.',
                cancelBtnText: 'Dismiss',
                buttons: [{
                  title: 'Reconnect Twitter Plug',
                  link: `//${this.hatUrl}/#/hatlogin?` +
                        `name=Twitter&redirect=https://twitter-plug.hubofallthings.com/authenticate/hat/`
                }]
              });
            }
          });
        }
      }
    );
  }

}

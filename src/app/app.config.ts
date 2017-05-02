/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { OpaqueToken } from '@angular/core';

export let APP_CONFIG = new OpaqueToken('app.config');

export class IAppConfig {
  version: string;
  name: string;
  native: boolean;
  protocol: string;
  market: { url: string; id: string; accessToken: string; };
  facebook: { shareUrl: string; };
  twitter: { shareUrl: string; };
  notables: {
    iconMap: { [key: string]: string; };
    marketSquareOfferId: string;
    activeIntegrations: Array<{ name: string; displayName: string; logoUrl: string; }>;
  };
  menuItems: {
    public: Array<any>;
    private: Array<any>;
    dataPlugs: Array<any>;
  };
}

export const AppConfig: IAppConfig = {
  version: '2.0.1',
  name: 'Rumpel',
  native: true,
  protocol: 'https:',
  market: {
    url: 'https://marketsquare.hubofallthings.com/api',
    id: 'b6673e46-9246-4135-905e-c275e01e6b5d',
    accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxLTU3alM2RkN4NXV3WHFLWWp0cHZRaDBDSzg5cXhta042dldjQmd'
               + 'BZHNUM0ZnUlZCSnlrTnVyKzhPK2hXRDAwOTh0SGtaZUFSc1ZsMGM0b3d3aGZhVTU3WEpQa1dpOHBXbHFSTjdrSWM9IiwiZGF0YXBs'
               + 'dWciOiJiNjY3M2U0Ni05MjQ2LTQxMzUtOTA1ZS1jMjc1ZTAxZTZiNWQiLCJpc3MiOiJoYXQtbWFya2V0IiwiZXhwIjoxNTE1NzU3M'
               + 'zA5LCJpYXQiOjE0ODQ5OTg5MDksImp0aSI6IjRlMDMxZTYzY2Q4MzY5MTNhZTE5ZDUwNTQ1OTNhNjNhNzFjZTFiNWZjMzFiZGM2NW'
               + 'MxOGQ0NmJiM2ZjMDVmNzQ2NWRlMTcwOTU0MGE0MTU1NTI5OTgwMWJmYzRhYmQwYjQxOThmMGQ3ZjhhOTNjNjdlNTliM2I0NWE4ZGZ'
               + 'kYWZmOWY4Yjk0NmIxNDBkNWM2ZGI5ZmY2N2QzMDVjYmE4YjVjOTRiYjY0OGY2MTk1MzA2OThiODQ0NTZlZTA1ODlmMzI5MTgyZjc2'
               + 'OGMxNTQ4NWI4NDUxMTk3ZjlkZDU2YmY0NmRkZWJhZmVjOTA0YmNiMzhkZTI1NDhmM2Y0YjU4MWMifQ.H6S8LZouFFChfWd27X2T_f'
               + 'MvBt8unI6tUwudbDEPwNc'
  },
  facebook: {
    shareUrl: 'https://www.facebook.com/sharer/sharer.php?u='
  },
  twitter: {
    shareUrl: 'https://twitter.com/intent/tweet?url='
  },
  notables: {
    iconMap: { note: 'ellipsischat', list: 'list', blog: 'write' },
    marketSquareOfferId: '32dde42f-5df9-4841-8257-5639db222e41',
    activeIntegrations: [
      {
        name: 'marketsquare',
        displayName: 'MarketSquare',
        logoUrl: 'assets/icons/marketsquare-icon.png'
      },
      {
        name: 'facebook',
        displayName: 'Facebook',
        logoUrl: 'assets/icons/facebook-plug.png'
      },
      {
        name: 'twitter',
        displayName: 'Twitter',
        logoUrl: 'assets/icons/twitter-plug.png'
      }
    ]
  },
  menuItems: {
    'public': [
      { display: 'Public profile', icon: 'user', link: 'public/profile', dataType: '', disable: '' },
      { display: 'Shared notables', icon: 'notebook', link: 'public/notables', dataType: '', disable: '' },
    ],
    'private': [
      { display: 'Dashboard', icon: 'dashboard', link: 'dashboard', dataType: '', disable: '' },
      { display: 'My data store', icon: 'security', link: 'datastore', dataType: 'profile', disable: '' },
      { display: 'Redeem offers', icon: 'local_offer', link: 'offers', dataType: '', disable: '' },
      { display: 'My data services', icon: 'assessment', link: 'profile', dataType: '', disable: '' },
      { display: 'My data plugs', icon: 'settings_input_component', link: 'dataplugs', dataType: '', disable: '' }
    ],
    'dataPlugs': [
      { display: 'Facebook', activatedSearchName: 'posts', activatedSearchSource: 'facebook' },
      { display: 'Twitter', activatedSearchName: 'tweets', activatedSearchSource: 'twitter' },
      { display: 'Location', activatedSearchName: 'location', activatedSearchSource: 'rumpel' },
      { display: 'Google Calendar', activatedSearchName: 'events', activatedSearchSource: 'google' },
      { display: 'Calendar', activatedSearchName: 'events', activatedSearchSource: 'ical' },
      { display: 'Photos', activatedSearchName: 'photos', activatedSearchSource: 'dropbox' },
      { display: 'Rumpel', activatedSearchName: 'profile', activatedSearchSource: 'rumpel' }
    ]
  }
};

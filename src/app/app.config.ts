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
  exchange: { url: string; id: string; accessToken: string; };
  marketsquare: { url: string };
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
    comingSoon: Array<any>;
  };
}

export const AppConfig: IAppConfig = {
  version: '2.0.3',
  name: 'Rumpel',
  native: true,
  protocol: 'https:',
  exchange: {
    url: 'https://dex.hubofallthings.com/api',
    id: 'b6673e46-9246-4135-905e-c275e01e6b5d',
    accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxLVZTUDcrb0RleldPejBTOFd6MHhWM0J2eVNOYzViNnRcLzRKXC85'
               + 'TVlIWTQrVDdsSHdUSDRXMVVEWGFSVnVQeTFPZmtNajNSNDBjeTVERFRhQjZBNE44c3FGSTJmMUE1NzZUYjhiYmhhUT0iLCJpc3MiO'
               + 'iJoYXQtbWFya2V0IiwiZXhwIjoxNTI2OTc4OTkyLCJpYXQiOjE0OTYyMjA1OTIsImp0aSI6ImY0NTQ4NzI5MGRlZTA3NDI5YmQxMG'
               + 'ViMWZmNzJkZjZmODdiYzhhZDE0ZThjOGE3NmMyZGJlMjVhNDlmODNkOTNiMDJhMzg3NGI4NTI0NDhlODU0Y2ZmZmE0ZWQyZGY1MTY'
               + 'yZTBiYzRhNDk2NGRhYTlhOTc1M2EyMjA1ZjIzMzc5NWY3N2JiODhlYzQwNjQxZjM4MTk4NTgwYWY0YmExZmJkMDg5ZTlhNmU3NjJj'
               + 'N2NhODlkMDdhOTg3MmY1OTczNjdjYWQyYzA0NTdjZDhlODlmM2FlMWQ2MmRmODY3NTcwNTc3NTdiZDJjYzgzNTgyOTU4ZmZlMDVhN'
               + 'jI2NzBmNGMifQ.TvFs6Zp0E24ChFqn3rBP-cpqxZbvkhph91UILGJvM6U'
  },
  marketsquare: {
    url: 'https://marketsquare.hubofallthings.com/api'
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
      { display: 'Public Profile', icon: 'user', link: 'public/profile', dataType: '', disable: '' },
      { display: 'Shared Notables', icon: 'notebook', link: 'public/notables', dataType: '', disable: '' },
    ],
    'private': [
      { display: 'Dashboard', icon: 'dashboard', link: 'dashboard', dataType: '', disable: '' },
      { display: 'Notables', icon: 'notebook', link: 'notables', dataType: '', disable: '' },
      { display: 'Profile', icon: 'user', link: 'profile', dataType: 'profile', disable: '' },
      { display: 'Mashups', icon: 'layergroup', link: 'mashups/myday', dataType: '', disable: '' },
      { display: 'Locations', icon: 'tags', link: 'locations', dataType: 'locations', disable: 'no data' },
      { display: 'Calendar', icon: 'calendar', link: 'calendar', dataType: 'events', disable: 'no data' },
      { display: 'Social', icon: 'replyall', link: 'social', dataType: 'posts,tweets,music_listens', disable: 'no data' },
      { display: 'Photos', icon: 'camera', link: 'photos', dataType: 'photos', disable: 'no data' },
      { display: 'Data Plugs', icon: 'puzzle', link: 'dataplugs', dataType: '', disable: '' }
    ],
    'comingSoon': [
      { display: 'Weather', icon: 'thermometer', dataType: '', link: '' },
      { display: 'Finance', icon: 'bank', dataType: '', link: '' }
    ]
  }
};

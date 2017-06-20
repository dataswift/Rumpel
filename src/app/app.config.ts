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
    dataPlugs: Array<any>;
  };
}

export const AppConfig: IAppConfig = {
  version: '3.0.0',
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
    iconMap: { note: 'border_color', list: 'list', blog: 'library_books' },
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
      { display: 'Public profile', icon: 'account_circle', link: 'public/profile', dataType: '', disable: '' }
    ],
    'private': [
      { display: 'Dashboard', icon: 'dashboard', link: 'dashboard', dataType: '', disable: '',
      description: 'The dashboard is where you have an overview of Rumpel.' },

      { display: 'My personal data', icon: 'security', link: 'datastore', dataType: 'profile', disable: '',
      description: 'View and edit the details of your profile and decide what information is private and what is to be shared.' },

      { display: 'Redeem offers', icon: 'local_offer', link: 'offers', dataType: '', disable: '',
      description: 'Allow access to your data in exchange for cash, services or vouchers.' },

      { display: 'Notables', icon: 'border_color', link: 'notables', dataType: '', disable: '',
      description: `Your words are your memories!
      Notables allow you to create and keep your social media interactions, thoughts, blogs, shopping lists -
      all in one place, and lets you decide what is private to yourself and what to share!
      Enabling the calendar icon when the notable is shared will create a 7 day expiry of the note visibility in the sharing space.` },

      { display: 'My mashups', icon: 'layers', link: 'mashups/myday', dataType: '', disable: '',
      description: 'See mashups of your data' },

      { display: 'My data plugs', icon: 'settings_input_component', link: 'dataplugs', dataType: '', disable: '',
      description: `Data comes into your HAT via data plugs.
      Click here to see what data plugs are available, and what data plugs are already connected.` }
    ],
    'dataPlugs': [
      { display: 'Facebook', activatedSearchName: 'posts', activatedSearchSource: 'facebook', page: 'social' },
      { display: 'Twitter', activatedSearchName: 'tweets', activatedSearchSource: 'twitter', page: 'social' },
      { display: 'Location', activatedSearchName: 'location', activatedSearchSource: 'rumpel', page: 'locations' },
      { display: 'Google calendar', activatedSearchName: 'events', activatedSearchSource: 'google', page: 'calendar' },
      { display: 'Calendar', activatedSearchName: 'events', activatedSearchSource: 'ical', page: 'calendar' },
      { display: 'Dropbox photos', activatedSearchName: 'photos', activatedSearchSource: 'dropbox', page: 'photos' },
      { display: 'Rumpel', activatedSearchName: 'profile', activatedSearchSource: 'rumpel', page: 'dashboard' }
    ]
  }
};

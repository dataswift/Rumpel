/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export class AppConfig {
  version: string;
  name: string;
  supportedDomains: string[];
  native: boolean;
  protocol: string;
  dex: { name: string; url: string; pathPrefix: string; id: string; accessToken: string; };
  databuyer: { name: string; url: string; pathPrefix: string; };
  facebook: { shareUrl: string; };
  twitter: { shareUrl: string; };
  notables: {
    iconMap: { [key: string]: string; };
    dexOfferId: string;
  };
  menuItems: {
    public: Array<any>;
    private: Array<any>;
    dataPlugs: Array<any>;
  };
}

export const configuration: AppConfig = {
  version: '3.2.1',
  name: 'RumpelStaging',
  supportedDomains: ['.hubat.net', '.hat.direct'],
  native: environment.native,
  protocol: environment.protocol,
  dex: {
    name: 'Dex',
    url: 'https://dex.hubofallthings.com',
    pathPrefix: '/api/v2',
    id: 'b6673e46-9246-4135-905e-c275e01e6b5d',
    accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxLVZTUDcrb0RleldPejBTOFd6MHhWM0J2eVNOYzViNnRcLzRKXC85'
               + 'TVlIWTQrVDdsSHdUSDRXMVVEWGFSVnVQeTFPZmtNajNSNDBjeTVERFRhQjZBNE44c3FGSTJmMUE1NzZUYjhiYmhhUT0iLCJpc3MiO'
               + 'iJoYXQtbWFya2V0IiwiZXhwIjoxNTI2OTc4OTkyLCJpYXQiOjE0OTYyMjA1OTIsImp0aSI6ImY0NTQ4NzI5MGRlZTA3NDI5YmQxMG'
               + 'ViMWZmNzJkZjZmODdiYzhhZDE0ZThjOGE3NmMyZGJlMjVhNDlmODNkOTNiMDJhMzg3NGI4NTI0NDhlODU0Y2ZmZmE0ZWQyZGY1MTY'
               + 'yZTBiYzRhNDk2NGRhYTlhOTc1M2EyMjA1ZjIzMzc5NWY3N2JiODhlYzQwNjQxZjM4MTk4NTgwYWY0YmExZmJkMDg5ZTlhNmU3NjJj'
               + 'N2NhODlkMDdhOTg3MmY1OTczNjdjYWQyYzA0NTdjZDhlODlmM2FlMWQ2MmRmODY3NTcwNTc3NTdiZDJjYzgzNTgyOTU4ZmZlMDVhN'
               + 'jI2NzBmNGMifQ.TvFs6Zp0E24ChFqn3rBP-cpqxZbvkhph91UILGJvM6U'
  },
  databuyer: {
    name: 'DataBuyer',
    url: 'https://databuyer.hubat.net',
    pathPrefix: '/api/v2'
  },
  facebook: {
    shareUrl: 'https://www.facebook.com/sharer/sharer.php?u='
  },
  twitter: {
    shareUrl: 'https://twitter.com/intent/tweet?url='
  },
  notables: {
    iconMap: { note: 'border_color', list: 'list', blog: 'library_books' },
    dexOfferId: '8438fcf0-cfec-4d79-8338-f0987056352f'
  },
  menuItems: {
    'public': [
      { display: 'Public profile', icon: 'account_circle', link: 'public/profile', dataType: '', disable: '' }
    ],
    'private': [
      { display: 'My Digital Life', icon: 'line_weight', link: 'feed', dataType: '', disable: '',
      description: 'My Digital Life' },

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

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
  tokenApp: string;
  tokenExpiryTime: number;
  supportedDomains: string[];
  native: boolean;
  protocol: string;
  dex: { name: string; url: string; pathPrefix: string; };
  databuyer: { name: string; url: string; pathPrefix: string; };
  facebook: { shareUrl: string; };
  twitter: { shareUrl: string; };
  notables: {
    iconMap: { [key: string]: string; };
    dexOfferId: string;
    url: string;
  };
  mainMenu: Array<any>;
  appsMenu: Array<any>;
}

export const configuration: AppConfig = {
  version: '3.6.2.0',
  name: 'Rumpel',
  tokenApp: 'hatapp',
  tokenExpiryTime: 3,
  supportedDomains: ['.hubofallthings.net', '.hat.direct'],
  native: environment.native,
  protocol: environment.protocol,
  dex: {
    name: 'Dex',
    url: 'https://dex.hubofallthings.com',
    pathPrefix: '/api/v2'
  },
  databuyer: {
    name: 'DataBuyer',
    url: 'https://databuyer.hubofallthings.com',
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
    dexOfferId: '92e4a135-cd81-4c5e-bbf8-57bea3b7d9e0',
    url: 'https://notables.hubofallthings.com/api/bulletin/tickle'
  },
  mainMenu: [
    { display: 'My digital life', icon: 'line_weight', link: '/feed', dataType: '', disable: '',
      description: 'My Digital Life' },

    { display: 'Map', icon: 'map', link: '/mashups', dataType: '', disable: '',
      description: 'See your feed correlated with the places you\'ve been too.' },

    { display: 'My public profile', icon: 'security', link: '/datastore', dataType: 'profile', disable: '',
      description: 'View and edit the details of your profile and decide what information is private and what is to be shared.' },

    { display: 'Explore HAT apps', icon: 'touch_app', link: '/explore/App', dataType: '', disable: '',
      description: 'Explore all the apps available in the HAT ecosystem.' },

    { display: 'Data plugs', icon: 'settings_input_component', link: '/explore/DataPlug', dataType: '', disable: '',
    description: `Data comes into your HAT via data plugs.
    Click here to see what data plugs are available, and what data plugs are already connected.` },

    { display: 'Data debits', icon: 'swap_horiz', link: '/data-debit', dataType: '', disable: '',
      description: 'See all of the data debits setup on the HAT' },
  ],

  appsMenu: [
    { display: 'Notables', icon: '/assets/icons/she-notables.png', link: '/notables', dataType: '', disable: '',
      description: `Your words are your memories!
    Notables allow you to create and keep your social media interactions, thoughts, blogs, shopping lists -
    all in one place, and lets you decide what is private to yourself and what to share!
    Enabling the calendar icon when the notable is shared will create a 7 day expiry of the note visibility in the sharing space.` },

    { display: 'DataBuyer', icon: '/assets/icons/she-databuyer.png', link: '/offers', dataType: '', disable: '',
      description: 'Allow access to your data in exchange for cash, services or vouchers.' }
  ]
};

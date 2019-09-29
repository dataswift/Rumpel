/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 2016
 */

import { InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

const externalLinks = {
  bestPractices: 'https://docs.dataswift.io/why/security-best-practice',
  termsOfService: 'https://cdn.dataswift.io/legal/hat-owner-terms-of-service.pdf',
  privacyPolicy: 'https://cdn.dataswift.io/legal/dataswift-privacy-policy.pdf'
};

export class AppConfig {
  version: string;
  name: string;
  tokenApp: string;
  tokenExpiryTime: number;
  supportedDomains: string[];
  native: boolean;
  protocol: string;
  links: { bestPractices: string; privacyPolicy: string; termsOfService: string; };
  dex: { name: string; url: string; pathPrefix: string; };
  databuyer: { name: string; url: string; pathPrefix: string; };
  facebook: { shareUrl: string; };
  twitter: { shareUrl: string; };
  notables: {
    iconMap: { [key: string]: string; };
    dexOfferId: string;
    url: string;
  };
  mainMenu: Array<{ [key: string]: string; }>;
  settingsMenu: Array<{ [key: string]: string; }>;
  settingsPrivateDataMenu: Array<{ [key: string]: string; }>;
}

export const configuration: AppConfig = {
  version: '3.8.2.1',
  name: environment.appName,
  tokenApp: environment.tokenName,
  tokenExpiryTime: 3,
  supportedDomains: ['.hubofallthings.net', '.hubat.net', '.hat.direct', 'dataswift.me', '.dataswift.dev'],
  native: environment.native,
  protocol: environment.protocol,
  dex: {
    name: 'Dex',
    url: 'https://dex.hubofallthings.com',
    pathPrefix: '/api/v2'
  },
  links: {
    bestPractices: externalLinks.bestPractices,
    termsOfService: externalLinks.termsOfService,
    privacyPolicy: externalLinks.privacyPolicy
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
    { display: 'My digital life', icon: 'dashboard', link: '/feed', dataType: '', disable: '',
      description: 'My Digital Life' },

    { display: 'Map', icon: 'map', link: '/mashups', dataType: '', disable: '',
      description: 'See your feed correlated with the places you\'ve been too.' },

    { display: 'My public profile', icon: 'security', link: '/datastore', dataType: 'profile', disable: '',
      description: 'View and edit the details of your profile and decide what information is private and what is to be shared.' },

    { display: 'Tools & insights', icon: 'assessment', link: '/tools', dataType: '', disable: '',
      description: 'Tools and Insights are powered by the Smart HAT Engine (SHE)' },

    { display: 'Explore HAT apps', icon: 'touch_app', link: '/explore/App', dataType: '', disable: '',
      description: 'Explore all the apps available in the HAT ecosystem.' },

    { display: 'Data plugs', icon: 'settings_input_component', link: '/explore/DataPlug', dataType: '', disable: '',
    description: `Data comes into your HAT via data plugs.
    Click here to see what data plugs are available, and what data plugs are already connected.` },

    { display: 'Settings', icon: 'settings', link: '/settings', dataType: '', disable: '',
      description: 'Settings on the HAT' },
  ],

  settingsMenu: [
    { display: 'Change password', icon: 'keyboard_arrow_right', link: '/user/password/change',
      description: '' },

    { display: 'Tech support', icon: 'exit_to_app', link: 'mailto:contact@dataswift.io',
      description: '' },

    { display: 'Terms of Service', icon: 'exit_to_app',
      link: externalLinks.termsOfService,
      description: '' },

    { display: 'Privacy policy', icon: 'exit_to_app',
      link: externalLinks.privacyPolicy,
      description: '' },

    { display: 'Join the HAT Community', icon: 'exit_to_app', link: 'https://www.hatcommunity.org',
      description: '' },

    { display: 'Your HAT functionality level is 4 (learn more)', icon: 'exit_to_app',
      link: externalLinks.privacyPolicy,
      description: '' }
  ],
  settingsPrivateDataMenu: [
    { display: 'Profile', icon: 'keyboard_arrow_right', link: '/datastore',
      description: '' },

    { display: 'Data Debits', icon: 'keyboard_arrow_right', link: '/data-debit',
      description: '' },
  ]
};

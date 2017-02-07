/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { OpaqueToken } from '@angular/core';

export let APP_CONFIG = new OpaqueToken("app.config");

export class IAppConfig {
  version: string;
  market: { url: string; id: string; accessToken: string; };
  facebook: { shareUrl: string; };
  twitter: { shareUrl: string; };
  notables: { marketSquareOfferId: string;
              activeIntegrations: Array<{ name: string; displayName: string; logoUrl: string; }>;
  };
}

export const AppConfig: IAppConfig = {
  version: '1.3.1',
  market: {
    url: 'https://marketsquare.hubofallthings.com/api',
    id: 'b6673e46-9246-4135-905e-c275e01e6b5d',
    accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxLTU3alM2RkN4NXV3WHFLWWp0cHZRaDBDSzg5cXhta042dldjQmdBZHNUM0ZnUlZCSnlrTnVyKzhPK2hXRDAwOTh0SGtaZUFSc1ZsMGM0b3d3aGZhVTU3WEpQa1dpOHBXbHFSTjdrSWM9IiwiZGF0YXBsdWciOiJiNjY3M2U0Ni05MjQ2LTQxMzUtOTA1ZS1jMjc1ZTAxZTZiNWQiLCJpc3MiOiJoYXQtbWFya2V0IiwiZXhwIjoxNTE1NzU3MzA5LCJpYXQiOjE0ODQ5OTg5MDksImp0aSI6IjRlMDMxZTYzY2Q4MzY5MTNhZTE5ZDUwNTQ1OTNhNjNhNzFjZTFiNWZjMzFiZGM2NWMxOGQ0NmJiM2ZjMDVmNzQ2NWRlMTcwOTU0MGE0MTU1NTI5OTgwMWJmYzRhYmQwYjQxOThmMGQ3ZjhhOTNjNjdlNTliM2I0NWE4ZGZkYWZmOWY4Yjk0NmIxNDBkNWM2ZGI5ZmY2N2QzMDVjYmE4YjVjOTRiYjY0OGY2MTk1MzA2OThiODQ0NTZlZTA1ODlmMzI5MTgyZjc2OGMxNTQ4NWI4NDUxMTk3ZjlkZDU2YmY0NmRkZWJhZmVjOTA0YmNiMzhkZTI1NDhmM2Y0YjU4MWMifQ.H6S8LZouFFChfWd27X2T_fMvBt8unI6tUwudbDEPwNc'
  },
  facebook: {
    shareUrl: 'https://www.facebook.com/sharer/sharer.php?u='
  },
  twitter: {
    shareUrl: 'https://twitter.com/intent/tweet?url='
  },
  notables: {
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
  }
};

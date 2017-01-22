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
  version: '1.2.1',
  market: {
    url: 'https://marketsquare.hubofallthings.com/api',
    id: 'b6673e46-9246-4135-905e-c275e01e6b5d',
    accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyLURFcWJpNWlBbHR0QTUyZkhaaDJsU21ockdmQkRaZVQ2VWt5MXZZY3dWTGFUN3prakk1bGlcL2J3bHkrMlYrUTh3UDdabTVNaXE3OU1uOVRuUlNGWlJPbjYzZHhmc0tyRjQ4U1d5enJVPSIsImRhdGFwbHVnIjoiYjY2NzNlNDYtOTI0Ni00MTM1LTkwNWUtYzI3NWUwMWU2YjVkIiwiaXNzIjoiaGF0LW1hcmtldCIsImV4cCI6MTUwNDA4MjE1OCwiaWF0IjoxNDczMzIzNzU4LCJqdGkiOiIwMThiMjZkMzBjOThkNGYzNWYwY2I1NDk4MzA4M2Y5NTJlODQ1Zjc2MWMxNDBhYmY3YWJkOGYyYjU3MzA4ZTZhNjc5M2FkYmRmOGJkZTAxY2MxODE3NzBiOWUxNjY5YjkyMDg1NzMyNTZiMzk0NjRhOTZlMjJhN2FjMmU0YWExM2JmNzgwZWNmOTgzODU2N2JiYjBmOTgxMzc1MTVlM2Y2MDdlODY0YmM3ODQyZjc0MzI3MzlhNjhmYzdhNGQwN2Q2NmZhOGZmOGE1MzMxY2YxYjRiZjUyMWM5ZDJmNjdhMjdhNmJiMzMyMjdmNTliMWU0MWNiZDYzMmU3NzkxYThlIn0.Y93Ap0zSc8FQOEslCR2eBTg9GURXSruA-5E36NHP450'
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

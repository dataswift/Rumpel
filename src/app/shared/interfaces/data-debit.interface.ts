/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Bundle } from './bundle.interface';
import { HatRecord } from './hat-record.interface';

export interface DataDebit {
  dataDebitKey: string;
  dateCreated: any;
  client: Client;
  bundles: HatBundle[];
}

export interface DataDebitValues {
  bundle: { [endpoint: string]: HatRecord<any>[]; };
}

interface Client {
  userId: string;
  email: string;
  pass: string;
  name: string;
  role: string;
  roles: string[];
}

interface HatBundle {
  dateCreated: any;
  startDate: any;
  endDate: any;
  rolling: boolean;
  enabled: boolean;
  bundle: Bundle;
}

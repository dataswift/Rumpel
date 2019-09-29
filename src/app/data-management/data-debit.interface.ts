/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 2016
 */

import { BundleStructure } from '../shared/interfaces/bundle.interface';
import { HatRecord } from '../shared/interfaces/hat-record.interface';

export interface DataDebit {
  dataDebitKey: string;
  dateCreated: string;
  permissions: Array<DataDebitPermission>;
  requestClientName: string;
  requestClientUrl: string;
  requestClientLogoUrl: string;
  requestApplicationId?: string;
  requestDescription?: string;
  accepted: boolean;
  active: boolean;
  start: string | null;
  end: string | null;
  permissionsActive: DataDebitPermission | null;
  permissionsLatest: DataDebitPermission | null;
}

interface DataDebitPermission {
  dateCreated: string;
  purpose: string;
  start: string;
  period: number;
  cancelAtPeriodEnd: boolean;
  termsUrl: string;
  bundle: BundleStructure;
  accepted: boolean;
  active: boolean;
  end: string | null;
}

export interface DataDebitValues {
  bundle: { [endpoint: string]: HatRecord<any>[]; };
}

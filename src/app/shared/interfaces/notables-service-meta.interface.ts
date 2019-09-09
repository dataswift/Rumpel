/*
 * Copyright (C) 2017 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 1, 2017
 */

import { Moment } from 'moment';

export interface NotablesServiceMeta {
  phata: string;
  offerClaimed: boolean;
  userMessage: string;
  dataDebit?: DataDebitMeta;
}

interface DataDebitMeta {
  id: string;
  confirmed: boolean;
  dateCreated: Moment;
}

/*
 * Copyright (C) 2017 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 4, 2017
 */

export interface AccountStatus {
  previousLogin: string;
  databaseStorage: SystemInformation;
  databaseStorageUsed: SystemInformation;
  databaseStorageUsedShare: SystemInformation;
}

interface SystemInformation {
  metric: number;
  units: string;
  kind?: string;
}

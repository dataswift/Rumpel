/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 10, 2017
 */

import { BundleStructure } from '../shared/interfaces/bundle.interface';

export interface Offer {
  id: string;
  created: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  illustrationUrl: string;
  starts: number;
  expires: number;
  collectFor: number;
  requiredDataDefinition: DataDefinition[] | BundleStructure;
  dataConditions?: BundleStructure;
  requiredMinUser: number;
  requiredMaxUser: number;
  totalUserClaims: number;
  pii: boolean;
  reward: Cash | Service | Voucher;
  owner: Owner;
  claim: Claim | null;
}

export interface Claim {
  dateCreated: number;
  dateRedeemed: number | null;
  status: string; // "claimed", "completed", "rejected", "untouched", "failed", "redeemed"
  confirmed: boolean;
  dataDebitId: string | null;
}

export interface OffersStorage {
  availableOffers: Array<Offer>;
  acceptedOffers: Array<Offer>;
}

interface Owner {
  id: string;
  email: string;
  nick: string;
  firstName: string;
  lastName: string;
}

interface Cash {
  rewardType: string;
  currency: string;
  value: number;
}

interface Service {
  rewardType: string;
  vendor: string;
  vendorUrl: string;
  value: string;
}

interface Voucher {
  rewardType: string;
  vendor: string;
  vendorUrl: string;
  value: string;
  codes: string[];
  codesReusable: boolean;
  cashValue: Cash;
}

interface DataField {
  name: string;
  description: string;
  fields: DataField[];
}

interface DataSet {
  name: string;
  description: string;
  fields: DataField[];
}

interface DataDefinition {
  source: string;
  datasets: DataSet[];
}

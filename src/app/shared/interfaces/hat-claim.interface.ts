/*
 * Copyright (C) 2019 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Terry Lee <terry.lee@hatdex.org> 2, 2019
 */


export interface HatClaimRequest {
  email: string;
  termsAgreed: boolean;
  optins: Array<string>;
  hatName: string;
  hatCluster: string;
  password: string;
}

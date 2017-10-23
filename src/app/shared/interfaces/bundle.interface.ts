/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 10, 2017
 */

export interface Bundle {
  name: string;
  bundle: { [bundleVersion: string]: PropertyQuery };
}

interface PropertyQuery {
  endpoints: EndpointQuery[];
  orderBy?: string;
  ordering?: string;
  limit?: number;
}

export interface EndpointQuery {
  endpoint: string;
  mapping?: { [fieldName: string]: string };
  filters?: Filter[];
  links?: EndpointQuery[];
}

export interface Filter {
  field: string;
  transformation?: Transformation;
  operator: Operator;
}

interface Transformation {
  transformation: string;
  part?: string;
}

interface Operator {
  operator: string;
  value?: number | string;
  lower?: number | string;
  upper?: number | string;
  search?: string;
}

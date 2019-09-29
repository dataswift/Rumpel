/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Eleftherios Myteletsis <eleftherios.myteletsis@dataswift.io> 2019
 */

import { ReplaceCamelCasePipe } from './replace-camel-case.pipe';

describe('ReplaceCamelCasePipe', () => {
  it('create an instance', () => {
    const pipe = new ReplaceCamelCasePipe();
    expect(pipe).toBeTruthy();
  });
});

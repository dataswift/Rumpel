/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rump-switch',
  templateUrl: 'switch.component.html',
  styleUrls: ['switch.component.scss']
})
export class SwitchComponent implements OnInit {
  @Input() id: string;
  @Input() isChecked: boolean;
  @Input() disabled: boolean;
  @Output() onSwitch: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
  }

  toggleSwitch(event) {
    event.stopPropagation();
    event.preventDefault();
    if (!this.disabled) this.onSwitch.emit(this.id);
  }

}

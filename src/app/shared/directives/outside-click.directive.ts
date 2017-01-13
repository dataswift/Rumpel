/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Directive, Output, EventEmitter, ElementRef } from '@angular/core';

@Directive({
  selector: '[outside-click]',
  host: {
    '(document:click)': 'onClick($event)'
  }
})
export class OutsideClick {
  constructor(private _elementRef: ElementRef) {}

  @Output() clickOutside = new EventEmitter<any>();

  onClick(event) {
    const clickedInside = this._elementRef.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.clickOutside.emit(event);
    }
  }
}

/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Directive, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[rumOutsideClick]'
})
export class OutsideClickDirective {
  @Output()
  public clickOutside = new EventEmitter<any>();

  @HostListener('document:click', ['$event'])
  public onClick(targetEvent) {
    const clickedInside = this._elementRef.nativeElement.contains(targetEvent.target);

    if (!clickedInside) {
      this.clickOutside.emit(targetEvent);
    }
  }

  constructor(private _elementRef: ElementRef) {}

}

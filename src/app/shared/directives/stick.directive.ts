/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 2016
 */

import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[rumStick]'
})
export class StickDirective {

  private _minY = 100;
  private _className = 'stick';

  @Input('stickMin') set stickMin(minY: number) {
    this._minY = minY || this._minY;
  }

  @Input('stickClass') set stickClass(className: string) {
    this._className = className || this._className;
  }

  constructor(private _element: ElementRef) { }

  @HostListener('window:scroll', ['$event'])
  handleScrollEvent(e) {
    if (window.pageYOffset > this._minY) {
      this._element.nativeElement.classList.add(this._className);
    } else {
      this._element.nativeElement.classList.remove(this._className);
    }
  }

}

/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 1, 2017
 */

import { Component, OnInit, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'rum-info-box',
  templateUrl: './info-box.component.html'
})
export class InfoBoxComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() icon: string;
  private destroy: Function;
  public scrollTop: number;
  public animateIn = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.scrollTop = document.body.scrollTop;
    this.animateIn = true;
    this.renderer.addClass(document.body, 'no-scroll');
  }

  closeModal(): void {
    this.renderer.removeClass(document.body, 'no-scroll');
    document.body.scrollTop = this.scrollTop;

    this.animateIn = false;
    setTimeout(() => {
      this.destroy();
    }, 1000);
  }
}

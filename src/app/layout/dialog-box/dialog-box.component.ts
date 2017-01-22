/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'rump-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {
  @Input() title: string = "Are you sure?";
  @Input() message: string = `You are now leaving your private Rumpel space. Are you sure? 
                             (You may need to login to Rumpel again if you return unless you have enabled cookies on your web browser).`;
  @Input() buttons: Array<{ title: string; link: string; }> = [];
  private destroy: Function;

  constructor() { }

  ngOnInit() {
  }

  closeModal(): void {
    this.destroy();
  }

}

/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 4, 2017
 */

import { Component, OnInit } from '@angular/core';
import {HatApiService} from '../../services/hat-api.service';
import {Notable} from '../../shared/interfaces/notable.class';

@Component({
  selector: 'rump-public-notables',
  templateUrl: './public-notables.component.html',
  styleUrls: ['./public-notables.component.scss']
})
export class PublicNotablesComponent implements OnInit {
  public notables: Array<Notable>;

  constructor(private hatSvc: HatApiService) { }

  ngOnInit() {
    this.hatSvc.getPublicData('notables').subscribe((notables: Array<any>) => {
      this.notables = notables.map(note => new Notable(note, note.id));
    });
  }

}

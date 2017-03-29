/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MarketSquareService } from '../market-square.service';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.interface';

@Component({
  selector: 'rump-tile-data-offers',
  templateUrl: 'tile-data-offers.component.html',
  styleUrls: ['tile-data-offers.component.scss']
})
export class TileDataOffersComponent implements OnInit {
  public offers: any;
  @Output() navigateModal = new EventEmitter<any>();

  constructor(private marketSvc: MarketSquareService,
              private userSvc: UserService) {}

  ngOnInit() {
    this.userSvc.user$.subscribe((user: User) => {
      if (user.authenticated === true) {
        this.marketSvc.getValidOffers().subscribe(offers => this.offers = offers);
      }
    });
  }

}

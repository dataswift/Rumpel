/*
 * Copyright (C) 2019 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Eleftherios Myteletsis <eleftherios.myteletsis@dataswift.io> 3, 2019
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'rum-settings-footer',
  templateUrl: './settings-footer.component.html',
  styleUrls: ['./settings-footer.component.scss']
})
export class SettingsFooterComponent implements OnInit {

  constructor(private router: Router,
              private authSvc: AuthService) { }

  ngOnInit() {
  }

  signOut() {
    this.authSvc.logout();
    this.router.navigate(['/public/profile']);
  }
}

/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Notable, Location } from '../../shared/interfaces';
import { LocationsService } from '../../locations/locations.service';
import { NotablesService } from '../notables.service';
import { Router } from '@angular/router';
import {HatRecord} from '../../shared/interfaces/hat-record.interface';

@Component({
  selector: 'rump-input-box',
  templateUrl: 'input-box.component.html',
  styleUrls: ['input-box.component.scss']
})
export class InputBoxComponent implements OnInit {
  @Input() profile: { photo: { url: string; shared: boolean; }; };

  // Temporary workaround until Angular ships form reset feature
  public active: boolean;
  public expanded: boolean;
  public inputExpanded: boolean;
  public currentNotable: HatRecord<Notable>;

  public reportLocation: boolean;
  public shared: boolean;
  public expires: boolean;
  public message: string;

  constructor(private notableSvc: NotablesService,
              private locationsSvc: LocationsService,
              private router: Router) {}

  ngOnInit() {
    this.resetForm();
  }

  toggleExpiration() {
    if (this.expires) {
      this.expires = false;
      this.currentNotable.data.setExpirationDate(0);
    } else {
      this.expires = true;
      this.currentNotable.data.setExpirationDate(7);
    }
  }

  togglePrivacy() {
    if (this.shared) {
      this.currentNotable.data.toggleSharing();
      this.shared = false;
      this.expires = false;
    } else {
      this.currentNotable.data.toggleSharing();
      this.shared = true;
      this.currentNotable.data.message = this.message;
      this.notableSvc.editNotable(this.currentNotable);
      this.router.navigate(['notables']);
    }
  }

  toggleLocation() {
    if (this.currentNotable.data.locationv1) {
      this.currentNotable.data.locationv1 = null;
      this.reportLocation = false;
    } else {
      this.locationsSvc.getCurrentDeviceLocation((err, here: Location) => {
        if (err) {
          return this.reportLocation = false;
        }
        this.currentNotable.data.locationv1 = here;
        this.reportLocation = true;
      });
    }

  }

  expandView(event) {
    this.inputExpanded = true;
    setTimeout(() => this.expanded = true, 1000);
  }

  onSubmit(form: NgForm) {
    if (!form.value.message) { return; }

    const author = { phata: this.notableSvc.hatDomain };

    if (this.profile.photo.shared) {
      author['photo_url'] = this.profile.photo.url;
    }

    this.currentNotable.data.prepareToPost(form.value.message, author);

    this.notableSvc.postNotable(this.currentNotable.data);

    this.resetForm();
  }

  private resetForm() {
    this.active = false;
    setTimeout(() => this.active = true, 0);

    this.currentNotable = {
      endpoint: 'rumpel/notablesv1',
      recordId: null,
      data: new Notable()
    };

    this.shared = false;
    this.reportLocation = false;
    this.expires = false;

    this.expanded = false;
    this.inputExpanded = false;
  }
}

/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit } from '@angular/core';
import { NotablesService } from '../notables.service';
import { ProfilesService } from '../../profiles/profiles.service';
import { DialogService } from '../../layout/dialog.service';

import { ConfirmBoxComponent } from '../../layout/confirm-box/confirm-box.component';
import { Notable, Profile } from '../../shared/interfaces';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';

declare var $: any;

@Component({
  selector: 'rump-notables-view',
  templateUrl: './notables-view.component.html',
  styleUrls: ['./notables-view.component.scss']
})
export class NotablesViewComponent implements OnInit {
  public notables: HatRecord<Notable>[];
  public profile: { photo: { url: string; shared: boolean; }; };
  public filter: string;

  constructor(private notablesSvc: NotablesService,
              private profilesSvc: ProfilesService,
              private dialogSvc: DialogService) { }

  ngOnInit() {
    this.filter = '';
    this.notables = [];

    this.notablesSvc.data$.subscribe((notables: HatRecord<Notable>[]) => {
      this.notables = notables;
    });

    this.profile = {
      photo: { url: '', shared: false }
    };

    // this.profilesSvc.getPicture().subscribe(result => {
    //   if (result && result.url) {
    //     this.profile.photo.url = result.url;
    //   }
    // });

    this.profilesSvc.data$.subscribe((profileSnapshots: HatRecord<Profile>[]) => {
      const latestSnapshot = profileSnapshots[0];
      if (latestSnapshot && latestSnapshot.data.fb_profile_photo) {
        this.profile.photo.shared = !latestSnapshot.data.fb_profile_photo.private;
      }
    });
  }

  filterBy(category: string) {
    this.filter = category;
  }

  changeNotable(event) {
    switch (event.action) {
      case 'edit':
        this.notablesSvc.editNotable(event.notable);
        window.scrollTo(0, 100);
        break;

      case 'remove':
        if (event.notable.isShared) {
          this.dialogSvc.createDialog(ConfirmBoxComponent, {
            message: `Deleting a note that has already been shared will not delete it at the destination.
          To remove a note from the external site, first make it private. You may then choose to delete it.`,
            accept: () => {
              // event.target.parentNode.parentNode.className += " removed-item";
              setTimeout(() => this.notablesSvc.delete(event.notable), 900);
            }
          });
        } else {
          // event.target.parentNode.parentNode.className += " removed-item";
          setTimeout(() => this.notablesSvc.delete(event.notable.id), 900);
        }
        break;
    }
  }

  showPopover(event) {
    $('[data-toggle="popover"]').popover();
  }

}

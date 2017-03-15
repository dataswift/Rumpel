/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { LocationsService } from '../../locations/locations.service';
import { NotablesService } from '../notables.service';
import { Notable, Location } from '../../shared/interfaces';
import {DialogService} from "../../layout/dialog.service";
import {ConfirmBoxComponent} from "../../layout/confirm-box/confirm-box.component";
import {CurrentNotableMeta} from "../../shared/interfaces/current-notable-meta.interface";

declare var SimpleMDE: any;

@Component({
  selector: 'rump-notables-md-editor',
  templateUrl: './notables-md-editor.component.html',
  styleUrls: ['./notables-md-editor.component.scss']
})
export class NotablesMdEditorComponent implements OnInit {
  @Input() profile: { photo: { url: string; shared: boolean; }; };
  @ViewChild('editor') textarea: ElementRef;
  private mde: any;
  private currentNotableMeta: CurrentNotableMeta;
  private editMode: boolean = false;
  public currentNotable: Notable;
  private cannotPostMessage: string;

  constructor(private locationSvc: LocationsService,
              private notablesSvc: NotablesService,
              private dialogSvc: DialogService) { }

  ngOnInit() {
    this.mde = new SimpleMDE({
      element: this.textarea.nativeElement,
      status: false
    });

    this.currentNotableMeta ={
      phata: this.notablesSvc.hatDomain,
      expires: 0,
      reportLocation: false
    };

    this.currentNotable = new Notable();

    this.notablesSvc.editedNotable$.subscribe(notable => {
      this.currentNotable = notable;
      if (this.currentNotable.id) {
        this.currentNotableMeta = {
          phata: this.notablesSvc.hatDomain,
          expires: null,
          reportLocation: false,
          initialState: {
            isShared: notable.isShared,
            message: notable.message
          }
        };

        this.editMode = true;
      }
      this.resetForm();
    });

    this.resetForm();
  }

  switchType(typeName: string) {
    this.currentNotable.kind = typeName;
  }

  setExpiration(event: Event, days: number): void {
    event.preventDefault();
    event.stopPropagation();
    this.currentNotableMeta.expires = days;
    this.currentNotable.setExpirationDate(days);
  }

  togglePrivacy(): void {
    // A bit of a hack to force Angular change detection
    setTimeout(() => this.currentNotable.toggleSharing());
  }

  toggleLocation() {
    if (this.currentNotableMeta.reportLocation) {
      this.currentNotable.locationv1 = null;
      this.currentNotableMeta.reportLocation = false;
    } else {
      this.locationSvc.getCurrentDeviceLocation((err, here: Location) => {
        if (err) {
          return this.currentNotableMeta.reportLocation = false;
        }
        this.currentNotable.locationv1 = here;
        this.currentNotableMeta.reportLocation = true;
      });
    }
  }

  updateShareOptions(event) {
    this.cannotPostMessage = '';

    if (event.action === 'SHARE') {
      this.currentNotable.addShareDestination(event.service);
    } else if (event.action === 'STOP') {
      this.currentNotable.removeShareDestination(event.service);
    }
  }

  discardChanges() {
    this.currentNotable = new Notable();
    this.currentNotableMeta.expires = 0;
    this.resetForm();
  }

  submit() {
    if (this.currentNotable.isShared === true && this.currentNotable.shared_on.length === 0) {
      this.cannotPostMessage = "Please select at least one shared destination.";
      return;
    }

    if (!this.mde.value()) { return; }

    let author = { phata: this.currentNotableMeta.phata };

    if (this.profile.photo.shared) {
      author['photo_url'] = this.profile.photo.url;
    }

    this.currentNotable.prepareToPost(this.mde.value(), author);

    if (this.currentNotable.id) {
      this.editMode = false;

      if (this.currentNotable.isShared === false && this.currentNotableMeta.initialState.isShared === true) {
        this.dialogSvc.createDialog(ConfirmBoxComponent, {
          message: `This will remove your post at the shared destinations.
          Warning: any comments at the destination would also be deleted.`,
          accept: () => {
            this.updateNotableHelper();
          }
        });
      } else if (this.currentNotable.isShared === true && this.currentNotableMeta.initialState.isShared === false) {
        this.dialogSvc.createDialog(ConfirmBoxComponent, {
          message: `You are about to share your post.
          Tip: to remove a note from the external site, edit the note and make it private.`,
          accept: () => {
            this.updateNotableHelper();
          }
        });
      } else if (this.currentNotable.message !== this.currentNotableMeta.initialState.message && this.currentNotable.isShared === true && this.currentNotableMeta.initialState.isShared === true) {
        this.dialogSvc.createDialog(ConfirmBoxComponent, {
          message: `Your post would not be edited at the destination.`,
          accept: () => {
            this.updateNotableHelper()
          }
        });
      } else {
        this.updateNotableHelper();
      }
    } else if (this.currentNotable.isShared) {
      this.dialogSvc.createDialog(ConfirmBoxComponent, {
        message: `You are about to share your post.
          Tip: to remove a note from the external site, edit the note and make it private.`,
        accept: () => {
          this.postNotableHelper();
        }
      });
    } else {
      this.postNotableHelper();
    }
  }

  private postNotableHelper() {
    this.notablesSvc.postNotable(this.currentNotable);
    this.currentNotable = new Notable();
    this.currentNotableMeta.expires = 0;

    this.resetForm();
  }

  private updateNotableHelper() {
    this.notablesSvc.updateNotable(this.currentNotable);
    this.currentNotable = new Notable();
    this.currentNotableMeta.expires = 0;
    this.currentNotableMeta.initialState = undefined;

    this.resetForm();
  }

  private resetForm() {
    this.currentNotableMeta.reportLocation = !!this.currentNotable.locationv1;

    this.mde.value(this.currentNotable.message);
  }

}

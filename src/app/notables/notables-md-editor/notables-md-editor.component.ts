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
import { FileService } from '../../services/file.service';
import { DialogService } from '../../core/dialog.service';
import { Notable } from '../../shared/interfaces';
import { ConfirmBoxComponent } from '../../core/confirm-box/confirm-box.component';
import { FileUploadComponent } from '../../core/file-upload/file-upload.component';
import { CurrentNotableMeta } from '../../shared/interfaces/current-notable-meta.interface';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';
import { FileMetadataRes } from '../../shared/interfaces/file.interface';

declare var SimpleMDE: any;

@Component({
  selector: 'rum-notables-md-editor',
  templateUrl: './notables-md-editor.component.html',
  styleUrls: ['./notables-md-editor.component.scss']
})
export class NotablesMdEditorComponent implements OnInit {
  @Input() profile: { photo: { url: string; shared: boolean; }; };
  @ViewChild('editor') textarea: ElementRef;
  private mde: any;
  public currentNotableMeta: CurrentNotableMeta;
  public editMode = false;
  public currentNotable: HatRecord<Notable>;
  public cannotPostMessage: string;

  constructor(private locationSvc: LocationsService,
              private fileSvc: FileService,
              public notablesSvc: NotablesService,
              private dialogSvc: DialogService) { }

  ngOnInit() {
    this.mde = new SimpleMDE({
      element: this.textarea.nativeElement,
      status: false
    });

    const imageButton = this.mde.toolbar.find(tool => tool.name === 'image');
    imageButton.action = this.invokeFileUploadModal.bind(this);

    this.currentNotableMeta = {
      phata: this.notablesSvc.hatDomain,
      expires: 0,
      reportLocation: false
    };

    this.currentNotable = {
      endpoint: 'rumpel/notablesv1',
      recordId: null,
      data: new Notable()
    };

    this.fileSvc.file$.subscribe((fileMetadata: FileMetadataRes) => {
      this.currentNotable.data.photov1 = {
        link: `https://${this.notablesSvc.hatDomain}/api/v2/files/content/${fileMetadata.fileId}`,
        source: 'rumpel'
      };

      this.currentNotable = {
        endpoint: this.currentNotable.endpoint,
        recordId: this.currentNotable.recordId,
        data: new Notable(this.currentNotable.data)
      };
    });

    this.notablesSvc.editedNotable$.subscribe((notable: HatRecord<Notable>) => {
      this.currentNotable = notable;
      if (this.currentNotable.recordId) {
        this.currentNotableMeta = {
          phata: this.notablesSvc.hatDomain,
          expires: null,
          reportLocation: false,
          initialState: {
            isShared: notable.data.isShared,
            message: notable.data.message
          }
        };

        this.editMode = true;
      }
      this.resetForm();
    });

    this.resetForm();
  }

  switchType(typeName: string) {
    this.currentNotable.data.kind = typeName;
  }

  setExpiration(event: Event, days: number): void {
    event.preventDefault();
    event.stopPropagation();
    this.currentNotableMeta.expires = days;
    this.currentNotable.data.setExpirationDate(days);
  }

  togglePrivacy(): void {
    // A bit of a hack to force Angular change detection
    setTimeout(() => this.currentNotable.data.toggleSharing());
  }

  toggleLocation() {
    if (this.currentNotableMeta.reportLocation) {
      this.currentNotable.data.locationv1 = null;
      this.currentNotableMeta.reportLocation = false;
    } else {
      this.locationSvc.getCurrentDeviceLocation((err, here) => {
        if (err) {
          return this.currentNotableMeta.reportLocation = false;
        }
        this.currentNotable.data.locationv1 = here;
        this.currentNotableMeta.reportLocation = true;
      });
    }
  }

  updateShareOptions(notable: Notable) {
    this.currentNotable = {
      endpoint: this.currentNotable.endpoint,
      recordId: this.currentNotable.recordId,
      data: notable
    };
  }

  discardChanges() {
    this.currentNotable.data = new Notable();
    this.currentNotableMeta.expires = 0;
    this.resetForm();
  }

  invokeFileUploadModal() {
    this.dialogSvc.createDialog(FileUploadComponent, {});
  }

  submit() {
    if (this.currentNotable.data.isShared === true && this.currentNotable.data.shared_on.length === 0) {
      this.cannotPostMessage = 'Please select at least one shared destination.';

      return;
    }

    if (!this.mde.value()) { return; }

    const author = { phata: this.currentNotableMeta.phata };

    if (this.profile.photo.shared) {
      author['photo_url'] = this.profile.photo.url;
    }

    this.currentNotable.data.prepareToPost(this.mde.value(), author);

    if (this.currentNotable.recordId) {
      this.editMode = false;

      if (this.currentNotable.data.isShared === false && this.currentNotableMeta.initialState.isShared === true) {
        this.dialogSvc.createDialog(ConfirmBoxComponent, {
          message: `This will remove your post at the shared destinations.
          Warning: any comments at the destination would also be deleted.`,
          accept: () => {
            this.postNotableHelper();
          }
        });
      } else if (this.currentNotable.data.isShared === true && this.currentNotableMeta.initialState.isShared === false) {
        this.dialogSvc.createDialog(ConfirmBoxComponent, {
          message: `You are about to share your post.
          Tip: to remove a note from the external site, edit the note and make it private.`,
          accept: () => {
            this.postNotableHelper();
          }
        });
      } else if (this.currentNotable.data.message !== this.currentNotableMeta.initialState.message &&
                 this.currentNotable.data.isShared === true &&
                 this.currentNotableMeta.initialState.isShared === true) {
        this.dialogSvc.createDialog(ConfirmBoxComponent, {
          message: `Your post would not be edited at the destination.`,
          accept: () => {
            this.postNotableHelper();
          }
        });
      } else {
        this.postNotableHelper();
      }
    } else if (this.currentNotable.data.isShared) {
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
    this.notablesSvc.saveNotable(this.currentNotable).subscribe(_ => {
      console.log('Successfully saved: ', _);
    });
    this.currentNotable = {
      endpoint: 'rumpel/notablesv1',
      recordId: null,
      data: new Notable()
    };
    this.currentNotableMeta.expires = 0;

    this.resetForm();
  }

  private resetForm() {
    this.currentNotableMeta.reportLocation = !!this.currentNotable.data.locationv1;

    this.mde.value(this.currentNotable.data.message);
  }

}

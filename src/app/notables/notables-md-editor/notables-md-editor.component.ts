import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { HatApiService } from '../../services';
import { LocationsService } from '../../locations/locations.service';
import { NotablesService } from '../notables.service';
import { Notable, Location } from '../../shared/interfaces';
import * as SimpleMDE from 'simplemde';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'rump-notables-md-editor',
  templateUrl: './notables-md-editor.component.html',
  styleUrls: ['./notables-md-editor.component.scss']
})
export class NotablesMdEditorComponent implements OnInit {
  @Input() profile: { photo: { url: string; shared: boolean; }; };
  @ViewChild('editor') textarea: ElementRef;
  private mde: any;
  private hatDomain: string;
  public shared: boolean;
  private editMode: boolean = false;
  public expires: boolean;
  public reportLocation: boolean;
  public currentNotable: Notable;
  private cannotPostMessage: string;
  private dataDebitCreatedAt: Moment;

  constructor(private hatSvc: HatApiService,
              private locationSvc: LocationsService,
              private notablesSvc: NotablesService) { }

  ngOnInit() {
    this.mde = new SimpleMDE({
      element: this.textarea.nativeElement,
      status: false
    });

    this.hatDomain = this.hatSvc.getDomain();
    this.currentNotable = new Notable();

    this.notablesSvc.editedNotable$.subscribe(notable => {
      this.currentNotable = notable;
      if (this.currentNotable.id) this.editMode = true;
      this.resetForm();
    });

    this.notablesSvc.notablesMeta$.subscribe(notablesState => {
      if (notablesState.dataDebit) {
        this.dataDebitCreatedAt = notablesState.dataDebit.dateCreated;
      }
    });

    this.resetForm();
  }

  switchType(typeName: string) {
    this.currentNotable.kind = typeName;
  }

  toggleExpiration() {
    if (this.expires) {
      this.expires = false;
      this.currentNotable.setExpirationDate(0);
    } else if (this.shared) {
      this.expires = true;
      this.currentNotable.setExpirationDate(7);
    }
  }

  togglePrivacy() {
    if (this.shared) {
      this.currentNotable.makePrivate();
      this.shared = false;
      this.expires = false;
    } else {
      this.currentNotable.share();
      this.shared = true;
    }
  }

  toggleLocation() {
    if (this.reportLocation) {
      this.currentNotable.locationv1 = null;
      this.reportLocation = false;
    } else {
      this.locationSvc.getCurrentDeviceLocation((err, here: Location) => {
        if (err) {
          return this.reportLocation = false;
        }
        this.currentNotable.locationv1 = here;
        this.reportLocation = true;
      });
    }
  }

  updateShareOptions(event) {
    this.cannotPostMessage = '';

    if (event.action === 'SHARE') {
      this.currentNotable.shareOn(event.service);
    } else if (event.action === 'STOP') {
      this.currentNotable.stopSharingOn(event.service);
    }
  }

  discardChanges() {
    this.currentNotable = new Notable();
    this.resetForm();
  }

  submit() {
    if (this.currentNotable.isShared() === true && this.currentNotable.shared_on.length === 0) {
      this.cannotPostMessage = "Please select at least one shared destination.";
      return;
    }

    if (!this.mde.value()) { return; }

    if (this.currentNotable.isShared() && moment().subtract(30, 'minutes').isAfter(this.dataDebitCreatedAt)) {
      this.cannotPostMessage = "You created your first notable! First notables usually take 1-30 mins before appearing at its destination."
    }

    let author = { phata: this.hatDomain };

    if (this.profile.photo.shared) {
      author['photo_url'] = this.profile.photo.url;
    }

    this.currentNotable.prepareToPost(this.mde.value(), author);

    if (this.currentNotable.id) {
      this.editMode = false;
      this.notablesSvc.updateNotable(this.currentNotable);
    } else {
      this.notablesSvc.postNotable(this.currentNotable);
    }

    this.currentNotable = new Notable();

    this.resetForm();
  }

  private resetForm() {
    this.shared = this.currentNotable.isShared();
    this.expires = this.currentNotable.isExpired();
    this.reportLocation = !!this.currentNotable.locationv1;

    this.mde.value(this.currentNotable.message);
  }

}

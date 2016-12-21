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
  private editMode: boolean = false;
  public expires: number;
  public reportLocation: boolean;
  public currentNotable: Notable;
  private cannotPostMessage: string;

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
    this.expires = 0;

    this.notablesSvc.editedNotable$.subscribe(notable => {
      this.currentNotable = notable;
      if (this.currentNotable.id) {
        this.editMode = true;
        this.expires = null;
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
    this.expires = days;
    this.currentNotable.setExpirationDate(days);
  }

  togglePrivacy(): void {
    this.currentNotable.toggleSharing();
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
      this.currentNotable.addShareDestination(event.service);
    } else if (event.action === 'STOP') {
      this.currentNotable.removeShareDestination(event.service);
    }
  }

  discardChanges() {
    this.currentNotable = new Notable();
    this.expires = 0;
    this.resetForm();
  }

  submit() {
    if (this.currentNotable.isShared === true && this.currentNotable.shared_on.length === 0) {
      this.cannotPostMessage = "Please select at least one shared destination.";
      return;
    }

    if (!this.mde.value()) { return; }

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
    this.expires = 0;

    this.resetForm();
  }

  private resetForm() {
    this.reportLocation = !!this.currentNotable.locationv1;

    this.mde.value(this.currentNotable.message);
  }

}

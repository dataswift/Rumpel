import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { HatApiService } from '../../services';
import { LocationsService } from '../../locations/locations.service';
import { NotablesService } from '../notables.service';
import { Notable, Location } from '../../shared/interfaces';
import * as SimpleMDE from 'simplemde';

@Component({
  selector: 'rump-notables-md-editor',
  templateUrl: './notables-md-editor.component.html',
  styleUrls: ['./notables-md-editor.component.scss']
})
export class NotablesMdEditorComponent implements OnInit {
  @Input() userPhotoUrl: string;
  @ViewChild('editor') textarea: ElementRef;
  private mde: any;
  public shared: boolean;
  public expires: boolean;
  public reportLocation: boolean;
  public currentNotable: Notable;

  constructor(private hatSvc: HatApiService,
              private locationSvc: LocationsService,
              private notablesSvc: NotablesService) { }

  ngOnInit() {
    this.mde = new SimpleMDE({
      element: this.textarea.nativeElement,
      status: false
    });

    this.currentNotable = new Notable();

    this.notablesSvc.editedNotable$.subscribe(notable => {
      this.currentNotable = notable;
      this.resetForm();
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

  submit() {
    let author = {
      phata: this.hatSvc.getDomain(),
      photo_url: this.userPhotoUrl || ''
    };

    this.currentNotable.prepareToPost(this.mde.value(), author);

    if (this.currentNotable.id) {
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

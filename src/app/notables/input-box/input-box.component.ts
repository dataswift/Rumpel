import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Notable, Location } from '../../shared/interfaces';
import { HatApiService } from '../../services';
import { LocationsService } from '../../locations/locations.service';
import { NotablesService } from '../notables.service';

@Component({
  selector: 'rump-input-box',
  templateUrl: 'input-box.component.html',
  styleUrls: ['input-box.component.scss']
})
export class InputBoxComponent implements OnInit {
  @Input() userPhotoUrl: string;

  // Temporary workaround until Angular ships form reset feature
  public active: boolean;
  public expanded: boolean;
  public inputExpanded: boolean;
  public currentNotable: Notable;

  public reportLocation: boolean;
  public shared: boolean;
  public expires: boolean;

  constructor(private notableSvc: NotablesService,
              private locationsSvc: LocationsService,
              private hatSvc: HatApiService) {}

  ngOnInit() {
    this.resetForm();
  }

  toggleExpiration() {
    if (this.expires) {
      this.expires = false;
      this.currentNotable.setExpirationDate(0);
    } else {
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
    if (this.currentNotable.locationv1) {
      this.currentNotable.locationv1 = null;
      this.reportLocation = false;
    } else {
      this.locationsSvc.getCurrentDeviceLocation((err, here: Location) => {
        if (err) {
          return this.reportLocation = false;
        }
        this.currentNotable.locationv1 = here;
        this.reportLocation = true;
      });
    }

  }

  expandView(event) {
    this.inputExpanded = true;
    setTimeout(() => this.expanded = true, 1000);
  }

  onSubmit(form: NgForm) {
    let author = {
      phata: this.hatSvc.hatDomain,
      photo_url: this.userPhotoUrl || ''
    };

    this.currentNotable.prepareToPost(form.value.message, author);

    this.notableSvc.postNotable(this.currentNotable);

    this.resetForm();
  }

  private resetForm() {
    this.active = false;
    setTimeout(() => this.active = true, 0);

    this.currentNotable = new Notable();

    this.shared = false;
    this.reportLocation = false;
    this.expires = false;

    this.expanded = false;
    this.inputExpanded = false;
  }
}

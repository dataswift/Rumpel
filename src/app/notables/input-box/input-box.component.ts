import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Notable, Location } from '../../shared/interfaces';
import { HatApiService } from '../../services';
import { LocationsService } from '../../locations/locations.service';
import { NotablesService } from '../notables.service';
import { Router } from "@angular/router";

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
  public currentNotable: Notable;

  public reportLocation: boolean;
  public shared: boolean;
  public expires: boolean;
  private message: string;

  constructor(private notableSvc: NotablesService,
              private locationsSvc: LocationsService,
              private hatSvc: HatApiService,
              private router: Router) {}

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
      this.currentNotable.toggleSharing();
      this.shared = false;
      this.expires = false;
    } else {
      this.currentNotable.toggleSharing();
      this.shared = true;
      this.currentNotable.message = this.message;
      this.notableSvc.editNotable(this.currentNotable);
      this.router.navigate(['notables']);
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
    if (!form.value.message) { return; }

    let author = { phata: this.hatSvc.getDomain() };

    if (this.profile.photo.shared) {
      author['photo_url'] = this.profile.photo.url;
    }

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

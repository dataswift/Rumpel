import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Notable, Location } from '../../shared/interfaces';
import { LocationsService, HatApiService } from '../../services';
import { NotablesService } from '../notables.service';

import * as moment from 'moment';

@Component({
  selector: 'rump-input-box',
  templateUrl: 'input-box.component.html',
  styleUrls: ['input-box.component.scss']
})
export class InputBoxComponent implements OnInit {
  @Input() userPhotoUrl: string;

  // Temporary workaround until Angular ships form reset feature
  public active: boolean;
  public reportLocation: boolean;
  public expanded: boolean;
  public inputExpanded: boolean;
  public shared: boolean;
  public currentNotable: Notable;

  constructor(private notableSvc: NotablesService,
              private locationsSvc: LocationsService,
              private hatSvc: HatApiService) {}

  ngOnInit() {
    this.active = true;
    this.expanded = false;
    this.inputExpanded = false;

    this.currentNotable = new Notable();

    this.reportLocation = false;
    this.shared = false;
  }

  togglePrivacy() {
    if (this.shared) {
      this.currentNotable.stopSharingOn('marketsquare');
      this.shared = false;
    } else {
      this.currentNotable.shareOn('marketsquare');
      this.shared = true;
    }
  }

  toggleLocation() {
    if (this.currentNotable.location998) {
      this.currentNotable.location998 = null;
      this.reportLocation = false;
    } else {
      this.locationsSvc.getCurrentDeviceLocation((here: Location) => {
        console.log(here);
        this.currentNotable.location998 = here;
      });
      this.reportLocation = true;
    }

  }

  expandView(event) {
    this.inputExpanded = true;
    setTimeout(() => this.expanded = true, 1000);
  }

  onSubmit(form: NgForm) {
    let author = {
      phata: this.hatSvc.getDomain(),
      photo_url: this.userPhotoUrl || ''
    }

    this.currentNotable.prepareToPost(form.value.message, author);

    this.notableSvc.postNotable(this.currentNotable);

    this.resetForm();
  }

  resetForm() {
    this.active = false;
    setTimeout(() => this.active = true, 0);

    this.currentNotable = new Notable();
    this.shared = false;
    this.reportLocation = false;
  }

}

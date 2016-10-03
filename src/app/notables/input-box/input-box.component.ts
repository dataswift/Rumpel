import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Notable, Location } from '../../shared/interfaces';
import { LocationsService } from '../../services';
import { NotablesService } from '../notables.service';

import * as moment from 'moment';

@Component({
  selector: 'rump-input-box',
  templateUrl: 'input-box.component.html',
  styleUrls: ['input-box.component.scss']
})
export class InputBoxComponent implements OnInit {
  // Temporary workaround until Angular ships form reset feature
  public active: boolean;
  public reportLocation: boolean;
  private currentLocation: Location;

  constructor(private notableSvc: NotablesService,
              private locationsSvc: LocationsService) {}

  ngOnInit() {
    this.active = true;
    this.reportLocation = false;
  }

  changeLocationSetting() {
    this.reportLocation = !this.reportLocation;

    this.locationsSvc.getCurrentDeviceLocation((here: Location) => this.currentLocation = here);
  }

  onSubmit(form: NgForm) {
    let note: Notable = {
      message: form.value.message,
      created_time: moment().format(),
      updated_time: moment().format(),
      shared: [form.value.private]
    };

    if (this.reportLocation) {
      note['location'] = this.currentLocation;
    }

    this.notableSvc.postNotable(note);
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }

}

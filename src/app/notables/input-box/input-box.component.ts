import { Component, Input, OnInit } from '@angular/core';
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
  @Input() profilePhoto: any;

  // Temporary workaround until Angular ships form reset feature
  public active: boolean;
  public reportLocation: boolean;
  public expanded: boolean;
  public inputExpanded: boolean;
  public shared: boolean;
  private currentLocation: Location;

  constructor(private notableSvc: NotablesService,
              private locationsSvc: LocationsService) {}

  ngOnInit() {
    this.active = true;
    this.reportLocation = false;
    this.expanded = false;
    this.inputExpanded = false;
    this.shared = false;
  }

  changeLocationSetting() {
    this.reportLocation = !this.reportLocation;

    this.locationsSvc.getCurrentDeviceLocation((here: Location) => this.currentLocation = here);
  }

  expandView(event) {
    this.inputExpanded = true;
    setTimeout(() => this.expanded = true, 1000);
  }

  onSubmit(form: NgForm) {
    let note: Notable = {
      message: form.value.message,
      created_time: moment().format(),
      updated_time: moment().format(),
      shared: []
    };

    if (this.reportLocation) {
      note['location'] = this.currentLocation;
    }

    this.notableSvc.postNotable(note);
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }

}

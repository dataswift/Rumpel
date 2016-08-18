import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note, Location } from '../../../shared/interfaces';
import { RumpelService, LocationsService } from '../../../services';

import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'rump-notes-input',
  templateUrl: 'notes-input.component.html',
  styleUrls: ['notes-input.component.css']
})
export class NotesInputComponent implements OnInit {
  // Temporary workaround until Angular ships form reset feature
  public active: boolean;
  public reportLocation: boolean;
  private currentLocation: Location;

  constructor(private rumpelSvc: RumpelService,
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
    let note: Note = {
      message: form.value.message,
      created_time: moment().format(),
      updated_time: moment().format(),
      private: form.value.private === true
    };

    if (this.reportLocation) {
      note['location'] = this.currentLocation;
    }

    this.rumpelSvc.postNote(note);
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }

}

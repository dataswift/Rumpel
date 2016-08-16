import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from '../../../shared/interfaces';
import { RumpelService } from '../../../services';

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
  public note: Note;

  constructor(private rumpelSvc: RumpelService) {}

  ngOnInit() {
    this.active = true;
  }

  onSubmit(form: NgForm) {
    let note: Note = {
      message: form.value.message,
      created_time: moment().format(),
      updated_time: moment().format(),
      private: true
    };

    this.rumpelSvc.postNote(note);
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }

}

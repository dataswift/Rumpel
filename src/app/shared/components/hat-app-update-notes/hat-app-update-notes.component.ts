import { Component, Input, OnInit } from '@angular/core';
import { HatApplicationContent } from '../../../explore/hat-application.interface';

@Component({
  selector: 'rum-hat-app-update-notes',
  templateUrl: './hat-app-update-notes.component.html',
  styleUrls: ['./hat-app-update-notes.component.scss']
})
export class HatAppUpdateNotesComponent implements OnInit {
  @Input() app: HatApplicationContent;

  constructor() { }

  ngOnInit() {
  }

}

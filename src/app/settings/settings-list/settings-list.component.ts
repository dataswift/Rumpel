import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {APP_CONFIG, AppConfig} from '../../app.config';

@Component({
  selector: 'rum-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.scss']
})
export class SettingsListComponent implements OnInit {
  @Output() close = new EventEmitter<string>();

  constructor(@Inject(APP_CONFIG) private config: AppConfig) { }

  ngOnInit() {
  }
  get settingsMenu(): Array<any> {
    return this.config.settingsMenu;
  }

}

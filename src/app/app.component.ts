import { Component, OnInit, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from './app.config';

@Component({
  selector: 'rumpel',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppRootComponent implements OnInit {
  private showNotifications: boolean;

  // Had to use auxiliary variable canHide to control notification centre visibility.
  // Outside-click directive produces an error when applied onto dynamically inserted DOM element
  private canHide: boolean;

  constructor(@Inject(APP_CONFIG) private config: IAppConfig) { }

  ngOnInit() {
    console.log(`Rumpel is running. Version: ${this.config.version}`);

    this.showNotifications = false;
    this.canHide = false;
  }

  show() {
    this.showNotifications = true;

    setTimeout(() => this.canHide = true, 100);
    setTimeout(() => {
      this.canHide = false;
      this.showNotifications = false;
    }, 10000);
  }

  hide(event) {
    if (this.canHide === true) {
      this.showNotifications = false;
      this.canHide = false;
    }
  }
}

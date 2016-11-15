import { Component, OnInit, ViewContainerRef, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from './app.config';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'rumpel',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppRootComponent implements OnInit {
  private link: string;
  private showNotifications: boolean;

  // Had to use auxiliary variable canHide to control notification centre visibility.
  // Outside-click directive produces an error when applied onto dynamically inserted DOM element
  private canHide: boolean;

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              private overlay: Overlay,
              private vcRef: ViewContainerRef,
              public modal: Modal ) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit() {
    console.log(`Rumpel is running. Version: ${this.config.version}`);

    this.showNotifications = false;
    this.canHide = false;
  }

  setModalLink(link: string) {
    this.link = link;
    this.modal.alert()
      .size('lg')
      .showClose(true)
      .title('Are you sure?')
      .body(`<p>You are now leaving your private Rumpel space. Are you sure? (You may need to login to Rumpel again if you return unless you have enabled cookies on your web browser).</p>
        <button type="button" class="btn btn-default">Go Back</button>
        <button type="button" class="btn btn-primary" (click)="navigateTo()">Continue</button>`)
      .open();
  }

  navigateTo() {
    window.location.href = this.link;
  }

  show() {
    this.showNotifications = true;

    setTimeout(() => this.canHide = true, 100);
    setTimeout(() => this.showNotifications = false, 10000);
  }

  hide(event) {
    if (this.canHide === true) {
      this.showNotifications = false;
      this.canHide = false;
    }
  }
}

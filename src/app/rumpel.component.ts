import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { HeaderComponent } from './header/index';
import { FooterComponent } from './footer/index';
import { SideMenuComponent } from './side-menu/index';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
  moduleId: module.id,
  selector: 'rumpel',
  templateUrl: 'rumpel.component.html',
  styleUrls: ['rumpel.component.css'],
  directives: [HeaderComponent, FooterComponent, SideMenuComponent, ROUTER_DIRECTIVES]
})
export class RumpelAppComponent implements OnInit {
  private link: string;

  constructor(private router: Router,
              private overlay: Overlay,
              private vcRef: ViewContainerRef,
              public modal: Modal ) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit() {
    console.log("Rumpel is running. Version: 1.0.0-beta");
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
}

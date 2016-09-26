import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'rumpel',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppRootComponent implements OnInit {
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

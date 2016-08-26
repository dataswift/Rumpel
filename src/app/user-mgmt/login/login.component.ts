import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'rump-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  public hatDomain: string;

  constructor(private overlay: Overlay,
              private vcRef: ViewContainerRef,
              public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit() {
  }

  showScreenshot() {
    this.modal.alert()
      .size('lg')
      .showClose(true)
      .title('Example of a populated Rumpel')
      .body(`<img src="images/rumpel.png" class="img img-responsive">`)
      .open();
  }

  onSubmit() {
    window.location.href = 'https://' + this.hatDomain
    + '/hatlogin?name=Rumpel&redirect=https://rumpel.hubofallthings.com/users/authenticate';
  }

}

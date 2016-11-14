import { Component, OnInit, ViewContainerRef, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'rump-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  public hatDomain: string;
  private redirectUrl: string = 'https://rumpel.hubofallthings.com/users/authenticate';

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              private overlay: Overlay,
              private vcRef: ViewContainerRef,
              public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit() {
    // if (this.route.snapshot.queryParams['redirect']) {
    //   this.redirectUrl += this.route.snapshot.queryParams['redirect'];
    // } else {
    //   this.redirectUrl += 'dashboard';
    // }
  }

  showScreenshot() {
    this.modal.alert()
      .size('lg')
      .showClose(true)
      .title('Example of a populated Rumpel')
      .body(`<img src="assets/images/rumpel.png" class="img img-responsive">`)
      .open();
  }

  onSubmit() {
    window.location.href = `https://${this.hatDomain}/hatlogin?name=Rumpel&redirect=${this.redirectUrl}`;
  }

}

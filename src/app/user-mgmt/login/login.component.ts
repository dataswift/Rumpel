import { Component, OnInit, ViewContainerRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'rump-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  public hatDomain: string;
  private redirectUrl: string = 'https://rumpel.hubofallthings.com/';

  constructor(private overlay: Overlay,
              private vcRef: ViewContainerRef,
              private route: ActivatedRoute,
              public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit() {
    if (this.route.snapshot.queryParams['redirect']) {
      this.redirectUrl +=  this.route.snapshot.queryParams['redirect'];
    }
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

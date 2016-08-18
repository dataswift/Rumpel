import { Component, OnInit } from '@angular/core';
import { MODAL_DIRECTIVES } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  moduleId: module.id,
  selector: 'rump-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [MODAL_DIRECTIVES]
})
export class LoginComponent implements OnInit {
  public hatDomain: string;

  constructor() {}

  ngOnInit() {
  }

  onSubmit() {
    window.location.href = 'https://' + this.hatDomain
    + '/hatlogin?name=Rumpel&redirect=https://rumpel.hubofallthings.com/users/authenticate';
  }

}

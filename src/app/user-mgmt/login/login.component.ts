import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rump-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  public hatDomain: string;

  constructor() {}

  ngOnInit() {
  }

  onSubmit() {
    window.location.href = 'http://' + this.hatDomain;
  }

}

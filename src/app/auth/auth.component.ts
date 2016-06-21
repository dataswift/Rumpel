import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services';

@Component({
  moduleId: module.id,
  selector: 'rump-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.css']
})
export class AuthComponent implements OnInit {
  private _sub: any;

  constructor(private _route: ActivatedRoute,
              private _authSvc: AuthService) {}

  ngOnInit() {
    this._sub = this._route.params.subscribe(params => {
      let jwtToken = params['jwt'];
      this._authSvc.decodeJwt(jwtToken);
    });
  }

}

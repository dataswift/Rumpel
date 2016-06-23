import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, HatApiService } from '../services';

@Component({
  moduleId: module.id,
  selector: 'rump-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  private _sub: any;

  constructor(private _route: ActivatedRoute,
              private _hat: HatApiService,
              private _authSvc: AuthService) {}

  ngOnInit() {
    this._sub = this._route.params.subscribe(params => {
      let jwtToken = params['jwt'];
      this._authSvc.decodeJwt(jwtToken);
    });
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  test(name, source) {
    this._hat.getTable(name, source);
  }



}

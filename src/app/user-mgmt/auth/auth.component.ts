import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, HatApiService } from '../../services';

@Component({
  moduleId: module.id,
  selector: 'rump-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  private _subRoute: any;
  private _subAuth: any;

  constructor(private _route: ActivatedRoute,
              private router: Router,
              private _hat: HatApiService,
              private _authSvc: AuthService) {}

  ngOnInit() {
    this._subRoute = this._route.params.subscribe(params => {
      let jwtToken = params['jwt'];
      this._authSvc.authenticate(jwtToken);
    });

    this._subAuth = this._authSvc.auth$.subscribe(isAuthorised => {
      if (isAuthorised) this.router.navigate(['']);
    });
  }

  ngOnDestroy() {
    this._subRoute.unsubscribe();
    this._subAuth.unsubscribe();
  }
}

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
  public message: string;

  constructor(private _route: ActivatedRoute,
              private router: Router,
              private _hat: HatApiService,
              private _authSvc: AuthService) {}

  ngOnInit() {
    this.message = 'Authenticating... Please hold.';

    this._subAuth = this._authSvc.getAuth$().subscribe(isAuthorised => {
      if (isAuthorised) this.router.navigate([''])
      else this.message = 'Unfortunately authentication failed. Please contact your system administrator.';
    });

    this._subRoute = this._route.params.subscribe(params => {
      let jwtToken = params['jwt'];
      this._authSvc.authenticate(jwtToken);
    });
  }

  ngOnDestroy() {
    this._subRoute.unsubscribe();
    this._subAuth.unsubscribe();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, RumpelService } from '../../services';

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
              private authSvc: AuthService,
              private rumpelSvc: RumpelService) {}

  ngOnInit() {
    this.message = 'Accessing your HAT data... please hold.';

    this._subAuth = this.authSvc.auth$
      .flatMap(
        isAuthenticated => {
          if (isAuthenticated) return this.rumpelSvc.loadTableList();
          else throw new Error('Token validity could not be verified. HAT server might be down.');
      })
      .subscribe(
        state => {
          this.router.navigate(['']);
        },
        err => {
          this.message = 'Unfortunately authentication failed. Please contact your system administrator.';
        }
      );

    this._subRoute = this._route.params.subscribe(
      params => {
        let jwtToken = params['jwt'];
        this.authSvc.authenticate(jwtToken);
      },
      err => console.log('Ooops... Something went wrong'));
  }

  ngOnDestroy() {
    this._subRoute.unsubscribe();
    this._subAuth.unsubscribe();
  }
}

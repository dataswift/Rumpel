import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, RumpelService, MarketSquareService } from '../../services';

@Component({
  selector: 'rump-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  private subQP: any;
  private subPP: any;
  private _subAuth: any;
  public message: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authSvc: AuthService,
              private rumpelSvc: RumpelService,
              private msSvc: MarketSquareService) {}

  ngOnInit() {
    this.message = 'Accessing your HAT data... please hold.';

    this._subAuth = this.authSvc.auth$
      .flatMap(
        isAuthenticated => {
          if (isAuthenticated) {
            this.msSvc.connectHAT();
            return this.rumpelSvc.loadTableList();
          } else {
            throw new Error('Token validity could not be verified. HAT server might be down.');
          }
      })
      .subscribe(
        state => {
          this.router.navigate(['']);
        },
        err => {
          this.message = 'Unfortunately authentication failed. Please contact your system administrator.';
        }
      );

    this.subQP = this.route.queryParams
      .map(params => params['token'] || null)
      .subscribe(
        jwtToken => {
          if (jwtToken) this.authSvc.authenticate(jwtToken);
          // else this.message = 'Seems like your link did not have right authentication credentials.'
        },
        err => console.log('There has been a problem retrieving query parameters.'));

    this.subPP = this.route.params.subscribe(params => {
      let jwtToken = params['jwt'];
      if (jwtToken) this.authSvc.authenticate(jwtToken);
    });
  }

  ngOnDestroy() {
    this.subQP.unsubscribe();
    this.subPP.unsubscribe();
    this._subAuth.unsubscribe();
  }
}

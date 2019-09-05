import { Component, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { Params, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HatApplicationsService } from '../../explore/hat-applications.service';
import { HatApplication } from '../../explore/hat-application.interface';

const SMALL_SCREEN_BREAKPOINT = 720;

@Component({
  selector: 'rum-private-space',
  templateUrl: './private-space.component.html',
  styleUrls: ['./private-space.component.scss']
})
export class PrivateSpaceComponent implements OnInit {
  @ViewChild('sideNav', { static: true }) sideNav!: MatSidenav;

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_SCREEN_BREAKPOINT}px)`);

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
              private authSvc: AuthService,
              private hatAppSvc: HatApplicationsService,
              private router: Router,
              zone: NgZone) {
    this.mediaMatcher.addListener(mql => zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_SCREEN_BREAKPOINT}px)`)));
  }

  ngOnInit() {
    if (this.config.native) {
      this.hatAppSvc.getApplicationDetails(this.config.tokenApp)
        .subscribe((hatApp: HatApplication) => {
          if (hatApp && hatApp.needsUpdating) {
            const queryParams: Params = {
              name: this.config.tokenApp,
              redirect: '/feed',
              fallback: '/public/profile',
              internal: 'true'
            };

            this.router.navigate(['/hatlogin'], { queryParams });
          }
        });
    }
  }

  isSmallScreen(): boolean {
    return this.mediaMatcher.matches;
  }

  closeSideNav(event): void {
    if (this.isSmallScreen()) {
      this.sideNav.close();
    }
  }

}

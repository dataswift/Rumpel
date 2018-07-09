import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { ActivatedRoute } from '@angular/router';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { MatExpansionPanel } from '@angular/material/expansion';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'rum-login-standalone',
  templateUrl: './login-standalone.component.html',
  styleUrls: ['./login-standalone.component.scss']
})
export class LoginStandaloneComponent implements OnInit {
  @ViewChild(MatExpansionPanel) domainSelector: MatExpansionPanel;

  private redirectPath: string;
  public hatName: string;
  public selectedDomain: string;
  public hatNameError = false;

  constructor(@Inject(APP_CONFIG) public config: AppConfig,
              private route: ActivatedRoute,
              private authSvc: AuthService,
              private storageSvc: BrowserStorageService) { }

  ngOnInit() {
    this.hatName = this.storageSvc.getItem('lastLoginId') || '';
    this.redirectPath = this.route.snapshot.queryParams['redirect'] || 'feed';

    const lastLoginDomain = this.storageSvc.getItem('lastLoginDomain');
    this.selectedDomain = lastLoginDomain ? '.' + lastLoginDomain : this.config.supportedDomains[0];
  }

  selectDomain(domain: string) {
    this.selectedDomain = domain;
    this.domainSelector.close();
  }

  redirectToLogin(): void {
    // Add port 4200 for local redirects
    const hatAddress = this.hatName + this.selectedDomain;
    this.authSvc.domainRegistered(hatAddress).subscribe((registered: boolean) => {
      if (registered) {
        window.location.href = `//${hatAddress}/hatlogin?name=${this.config.name}&`
          + `redirect=${window.location.protocol}//${window.location.hostname}/${this.redirectPath}`;
      } else {
        this.hatNameError = true;
      }
    });
  }

  hideErrorMessage(): void {
    this.hatNameError = false;
  }

}

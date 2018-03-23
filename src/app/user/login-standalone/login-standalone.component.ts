import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { ActivatedRoute } from '@angular/router';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'rum-login-standalone',
  templateUrl: './login-standalone.component.html',
  styleUrls: ['./login-standalone.component.scss']
})
export class LoginStandaloneComponent implements OnInit {
  @ViewChild(MatExpansionPanel) domainSelector: MatExpansionPanel;

  private lastLoginId: string;
  private redirectPath: string;
  public hatName = '';
  public selectedDomain: string;

  constructor(@Inject(APP_CONFIG) public config: AppConfig,
              private route: ActivatedRoute,
              private storageSvc: BrowserStorageService) { }

  ngOnInit() {
    this.lastLoginId = this.storageSvc.getItem('lastLoginId');
    const lastLoginDomain = this.storageSvc.getItem('lastLoginDomain');
    this.selectedDomain = lastLoginDomain ? '.' + lastLoginDomain : this.config.supportedDomains[0];
    this.redirectPath = this.route.snapshot.queryParams['redirect'] || 'feed';
  }

  selectDomain(domain: string) {
    this.selectedDomain = domain;
    this.domainSelector.close();
  }

  redirectToLogin(): void {
    // Add port 4200 for local redirects
    const hatAddress = this.hatName + this.selectedDomain;
    window.location.href = `//${hatAddress}/hatlogin?name=${this.config.name}&`
      + `redirect=${window.location.protocol}//${window.location.hostname}/${this.redirectPath}`;
  }

}

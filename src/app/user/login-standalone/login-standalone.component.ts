import { Component, OnInit, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { ActivatedRoute } from '@angular/router';
import { BrowserStorageService } from '../../services/browser-storage.service';

@Component({
  selector: 'rum-login-standalone',
  templateUrl: './login-standalone.component.html',
  styleUrls: ['./login-standalone.component.scss']
})
export class LoginStandaloneComponent implements OnInit {
  public lastLoginId: string;
  private redirectPath: string;
  public dropdownExpanded = false;
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

  clearError() {
    // TODO: implement
  }

  setDomain(domain: string): void {
    this.dropdownExpanded = false;
    this.selectedDomain = domain;
  }

  onSubmit(form): void {
    // Add port 4200 for local redirects
    const hatAddress = form.value.username + this.selectedDomain;
    window.location.href = `//${hatAddress}/hatlogin?name=${this.config.name}&`
                         + `redirect=${window.location.protocol}//${window.location.hostname}/${this.redirectPath}`;
  }

}

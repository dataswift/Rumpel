import {Component, OnInit, Inject} from '@angular/core';
import {APP_CONFIG, IAppConfig} from "../../app.config";
import {ActivatedRoute} from "@angular/router";
import {CookieService} from "angular2-cookie/core";

@Component({
  selector: 'rump-login-standalone',
  templateUrl: './login-standalone.component.html',
  styleUrls: ['./login-standalone.component.scss']
})
export class LoginStandaloneComponent implements OnInit {
  private lastLoginDomain: string;
  private redirectPath: string;
  private dropdownExpanded: boolean = false;
  private availableDomains: Array<string> = [".hubofallthings.net", ".bheard.org"];
  private selectedDomain: string = this.availableDomains[0];

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              private route: ActivatedRoute,
              private cookieSvc: CookieService) { }

  ngOnInit() {
    this.lastLoginDomain = this.cookieSvc.get("lastLoginDomain");
    this.redirectPath = this.route.snapshot.queryParams["redirect"] || "home";
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
    window.location.href = `//${hatAddress}/hatlogin?name=${this.config.name}&redirect=${window.location.protocol}//${window.location.hostname}/${this.redirectPath}`;
  }

}

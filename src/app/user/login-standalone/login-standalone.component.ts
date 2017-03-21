import { Component, OnInit, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from "../../app.config";
import { ActivatedRoute } from "@angular/router";
import { BrowserStorageService } from "../../services/browser-storage.service";

@Component({
  selector: 'rump-login-standalone',
  templateUrl: './login-standalone.component.html',
  styleUrls: ['./login-standalone.component.scss']
})
export class LoginStandaloneComponent implements OnInit {
  private lastLoginId: string;
  private redirectPath: string;
  private dropdownExpanded: boolean = false;
  private availableDomains: Array<string> = [".hubofallthings.net", ".bheard.org"];
  private selectedDomain: string;

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              private route: ActivatedRoute,
              private storageSvc: BrowserStorageService) { }

  ngOnInit() {
    this.lastLoginId = this.storageSvc.getItem("lastLoginId");
    const lastLoginDomain = this.storageSvc.getItem("lastLoginDomain");
    this.selectedDomain = lastLoginDomain ? "." + lastLoginDomain : this.availableDomains[0];
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

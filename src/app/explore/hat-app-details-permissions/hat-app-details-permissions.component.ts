import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HatApplicationsService } from '../hat-applications.service';
import { Observable } from 'rxjs/Observable';
import { HatApplication } from '../hat-application.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'rum-hat-app-details-permissions',
  templateUrl: './hat-app-details-permissions.component.html',
  styleUrls: ['./hat-app-details-permissions.component.scss']
})
export class HatAppDetailsPermissionsComponent implements OnInit {
  public hatApp$: Observable<HatApplication>;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private hatAppSvc: HatApplicationsService) { }

  ngOnInit() {
    const appId = this.route.snapshot.params['appId'];

    this.hatApp$ = this.hatAppSvc.getApplicationDetails(appId);
  }

  navigateBack(): void {
    this.location.back();
  }
}

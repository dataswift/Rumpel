import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HatApplicationsService } from '../hat-applications.service';
import { HatApplicationContent } from '../hat-application.interface';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'rum-hat-application-details',
  templateUrl: './hat-application-details.component.html',
  styleUrls: ['./hat-application-details.component.scss']
})
export class HatApplicationDetailsComponent implements OnInit {
  public appDetails$: Observable<HatApplicationContent>;

  constructor(private activatedRoute: ActivatedRoute,
              private location: Location,
              private hatAppSvc: HatApplicationsService) { }

  ngOnInit() {
    this.appDetails$ = this.activatedRoute.params.flatMap(pathParams => {
      return this.hatAppSvc.getApplicationDetails(pathParams['appName']);
    });
  }

  closeComponentView(): void {
    this.location.back();
  }

}

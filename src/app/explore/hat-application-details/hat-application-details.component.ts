import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HatApplicationsService } from '../hat-applications.service';
import {HatApplication, HatApplicationContent} from '../hat-application.interface';
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
    this.appDetails$ = this.activatedRoute.params.flatMap(pathParams => this.hatAppSvc.getApplicationDetails());
  }

  closeComponentView(): void {
    console.log('Closing app details view');
    this.location.back();
  }

}

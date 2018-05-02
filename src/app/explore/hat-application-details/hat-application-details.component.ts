import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HatApplicationsService } from '../hat-applications.service';
import { HatApplication } from '../hat-application.interface';
import { Observable } from 'rxjs/Observable';
import { SheFeed } from '../../she/she-feed.interface';

@Component({
  selector: 'rum-hat-application-details',
  templateUrl: './hat-application-details.component.html',
  styleUrls: ['./hat-application-details.component.scss']
})
export class HatApplicationDetailsComponent implements OnInit {
  public appDetails$: Observable<HatApplication>;

  constructor(private activatedRoute: ActivatedRoute,
              private location: Location,
              private hatAppSvc: HatApplicationsService) { }

  ngOnInit() {
    this.appDetails$ = this.activatedRoute.params.flatMap(pathParams => {
      const appId = pathParams['appId'];

      return Observable.forkJoin(
        this.hatAppSvc.getApplicationDetails(appId),
        this.hatAppSvc.getApplicationData(appId)
      )
        .map((results: [HatApplication, SheFeed[]]) => {
          if (results[1].length > 0) {
            results[0].application.info.dataPreview = results[1];
          }

          return results[0];
        })
    });
  }

  closeComponentView(): void {
    this.location.back();
  }

}

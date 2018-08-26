import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HatApplicationsService } from '../hat-applications.service';
import { StaticDataService } from '../../services/static-data.service';
import { HatApplication, HatApplicationSetup } from '../hat-application.interface';
import { forkJoin, of, Observable } from 'rxjs';
import { catchError, flatMap, map, mergeMap, tap } from 'rxjs/operators';
import { SheFeed } from '../../she/she-feed.interface';

import * as moment from 'moment';

@Component({
  selector: 'rum-hat-application-details',
  templateUrl: './hat-application-details.component.html',
  styleUrls: ['./hat-application-details.component.scss']
})
export class HatApplicationDetailsComponent implements OnInit {
  public appDetails$: Observable<HatApplication>;
  public appStatus: 'goto' | 'running' | 'fetching' | 'failing' | 'untouched' | 'update';
  public dataPreview: SheFeed[];
  public staticData: any;
  public appInformation: string[][];

  constructor(private activatedRoute: ActivatedRoute,
              private location: Location,
              private hatAppSvc: HatApplicationsService,
              private staticDataSvc: StaticDataService) { }

  ngOnInit() {
    this.appDetails$ = this.activatedRoute.params.pipe(mergeMap(pathParams => {
      const appId = pathParams['appId'];

      return this.hatAppSvc.getApplicationDetails(appId).pipe(
        tap((app: HatApplication) => {
          this.appStatus = this.hatAppSvc.getAppStatus(app);
          const { name, url, country } = app.application.developer;
          const { version, termsUrl, supportContact } = app.application.info;

          this.appInformation = [
            ['provider', name],
            ['website', url],
            ['country', country],
            ['version', version],
            ['last updated', moment(app.application.status.versionReleaseDate).format('DD/MM/YYYY')],
            ['terms and conditions', termsUrl],
            ['support email', supportContact]
          ];
        }),
        flatMap((app: HatApplication) => {
          return forkJoin(
            this.hatAppSvc.getApplicationData(app.application.status.dataPreviewEndpoint),
            this.staticDataSvc.fetchData(app.application.id).pipe(catchError(err => of([])))
            )
            .pipe(map(result => {
              return { app, sheFeed: result[0], staticData: result[1] };
            }));
        }),
        map((results) => {
          if (results.sheFeed.length > 0) {
            this.dataPreview = results.sheFeed;
          }

          if (results.staticData.length > 0) {
            this.staticData = results.staticData[0];
          }

          return results.app;
        }));
    }));
  }

  generateHatLoginLink(id: string, setup: HatApplicationSetup): string {
    return this.hatAppSvc.generateHatLoginLink(id, setup);
  }

  disableApp(id: string): void {
    this.appDetails$ = this.hatAppSvc.disable(id)
      .pipe(tap((app: HatApplication) => this.appStatus = this.hatAppSvc.getAppStatus(app)));
  }

  closeComponentView(): void {
    this.location.back();
  }
}

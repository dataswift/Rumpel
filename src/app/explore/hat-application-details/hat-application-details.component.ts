import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HatApplicationsService } from '../hat-applications.service';
import { StaticDataService } from '../../services/static-data.service';
import { HatApplication, HatApplicationSetup } from '../hat-application.interface';
import { of, Observable } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { SheFeed } from '../../she/she-feed.interface';
import * as startOfDay from 'date-fns/start_of_day';
import * as subMonths from 'date-fns/sub_months';
import * as parse from 'date-fns/parse';
import * as format from 'date-fns/format';

@Component({
  selector: 'rum-hat-application-details',
  templateUrl: './hat-application-details.component.html',
  styleUrls: ['./hat-application-details.component.scss']
})
export class HatApplicationDetailsComponent implements OnInit {
  public appDetails$: Observable<HatApplication>;
  public staticData$: Observable<Array<string[][]>>;
  public dataPreview$: Observable<SheFeed[]>;
  public appStatus: 'goto' | 'running' | 'fetching' | 'failing' | 'untouched' | 'update';
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
            ['last updated', format(app.application.status.versionReleaseDate, 'DD/MM/YYYY')],
            ['terms and conditions', termsUrl],
            ['support email', supportContact]
          ];
          this.staticData$ = this.staticDataSvc.fetchSheStaticInfo(app.application.id).pipe(
            tap(() => {
             if (app.application.status && app.application.status.dataPreviewEndpoint && app.mostRecentData) {
               const defaultUntil = parse(app.mostRecentData);
               const defaultSince = subMonths(startOfDay(defaultUntil), 1);

               this.dataPreview$ = this.hatAppSvc.getApplicationData(
                 app.application.status.dataPreviewEndpoint,
                 format(defaultSince, 'X'),
                 format(defaultUntil, 'X')
               );
             } else {
               this.dataPreview$ = of([]);
             }
            }),
              catchError(err => of([])));
        }));
    }));
  }

  generateHatLoginLink(id: string, setup: HatApplicationSetup): string {
    return this.hatAppSvc.generateHatLoginLink(id, setup);
  }

  getTabName(kind: string): string {
    if (kind === 'App') {
      return 'App Info';
    } else {
      return 'Plug Info';
    }
  }

  disableApp(id: string): void {
    this.appDetails$ = this.hatAppSvc.disable(id)
      .pipe(tap((app: HatApplication) => this.appStatus = this.hatAppSvc.getAppStatus(app)));
  }

  closeComponentView(): void {
    this.location.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HatApplicationsService } from '../hat-applications.service';
import { HatApplication, HatApplicationSetup } from '../hat-application.interface';
import { Observable } from 'rxjs';
import { flatMap, map, mergeMap, tap} from 'rxjs/operators';
import { SheFeed } from '../../she/she-feed.interface';

@Component({
  selector: 'rum-hat-application-details',
  templateUrl: './hat-application-details.component.html',
  styleUrls: ['./hat-application-details.component.scss']
})
export class HatApplicationDetailsComponent implements OnInit {
  public appDetails$: Observable<HatApplication>;
  public appStatus: 'goto' | 'running' | 'fetching' | 'failing' | 'untouched' | 'update';

  constructor(private activatedRoute: ActivatedRoute,
              private location: Location,
              private hatAppSvc: HatApplicationsService) { }

  ngOnInit() {
    this.appDetails$ = this.activatedRoute.params.pipe(mergeMap(pathParams => {
      const appId = pathParams['appId'];

      return this.hatAppSvc.getApplicationDetails(appId).pipe(
        tap((app: HatApplication) => this.appStatus = this.hatAppSvc.getAppStatus(app)),
        flatMap((app: HatApplication) => {
          return this.hatAppSvc.getApplicationData(app.application.status.dataPreviewEndpoint)
            .pipe(map(result => [app, result]));
        }),
        map((results: [HatApplication, SheFeed[]]) => {
          if (results[1].length > 0) {
            results[0].application.info.dataPreview = results[1];
          }

          return results[0];
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

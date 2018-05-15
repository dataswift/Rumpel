import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HatApplicationsService } from '../hat-applications.service';
import { HatApplication, HatApplicationSetup } from '../hat-application.interface';
import { Observable } from 'rxjs/Observable';
import { SheFeed } from '../../she/she-feed.interface';

@Component({
  selector: 'rum-hat-application-details',
  templateUrl: './hat-application-details.component.html',
  styleUrls: ['./hat-application-details.component.scss']
})
export class HatApplicationDetailsComponent implements OnInit {
  public appDetails$: Observable<HatApplication>;
  public appStatus: 'goto' | 'running' | 'fetching' | 'failing' | 'untouched';

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
        .do((results: [HatApplication, SheFeed[]]) => this.setAppStatus(results[0]))
        .map((results: [HatApplication, SheFeed[]]) => {
          if (results[1].length > 0) {
            results[0].application.info.dataPreview = results[1];
          }

          return results[0];
        })
    });
  }

  generateHatLoginLink(id: string, setup: HatApplicationSetup): string {
    return this.hatAppSvc.generateHatLoginLink(id, setup);
  }

  disableApp(id: string): void {
    this.appDetails$ = this.hatAppSvc.disable(id).do(this.setAppStatus);
  }

  closeComponentView(): void {
    this.location.back();
  }

  private setAppStatus(app: HatApplication): void {
    const { setup, active, needsUpdating, mostRecentData } = app;
    const kind = app.application.kind.kind;

    if (kind === 'App') {
      if ((setup && !active) || needsUpdating) {
        this.appStatus = 'failing';
      } else if (active) {
        this.appStatus = 'goto';
      } else {
        this.appStatus = 'untouched';
      }
    } else if (kind === 'DataPlug') {
      if ((setup && !active && mostRecentData) || needsUpdating) {
        this.appStatus = 'failing';
      } else if (setup && active && mostRecentData) {
        this.appStatus = 'running';
      } else if (setup && !active && !mostRecentData) {
        this.appStatus = 'fetching';
      } else {
        this.appStatus = 'untouched';
      }
    } else {
      this.appStatus = 'untouched';
    }
  }

}

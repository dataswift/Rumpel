import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HatApplicationsService } from '../hat-applications.service';
import { HatApplication, HatApplicationSetup } from '../hat-application.interface';
import { Observable } from 'rxjs/Observable';
import { SheFeed } from '../../she/she-feed.interface';
import { AuthService } from '../../core/services/auth.service';
import {User} from '../../user/user.interface';

@Component({
  selector: 'rum-hat-application-details',
  templateUrl: './hat-application-details.component.html',
  styleUrls: ['./hat-application-details.component.scss']
})
export class HatApplicationDetailsComponent implements OnInit {
  public appDetails$: Observable<HatApplication>;
  public appStatus: 'running' | 'fetching' | 'failing' | 'untouched';

  constructor(private activatedRoute: ActivatedRoute,
              private authSvc: AuthService,
              private location: Location,
              private hatAppSvc: HatApplicationsService) { }

  ngOnInit() {
    this.appDetails$ = this.activatedRoute.params.flatMap(pathParams => {
      const appId = pathParams['appId'];

      return Observable.forkJoin(
        this.hatAppSvc.getApplicationDetails(appId),
        this.hatAppSvc.getApplicationData(appId)
      )
        .do((results: [HatApplication, SheFeed[]]) => {
          const { setup, active, mostRecentData } = results[0];
          if (setup && active && mostRecentData) {
            this.appStatus = 'running';
          } else if (setup && !active && !mostRecentData) {
            this.appStatus = 'fetching';
          } else if (setup && !active && mostRecentData) {
            this.appStatus = 'failing';
          } else {
            this.appStatus = 'untouched';
          }
        })
        .map((results: [HatApplication, SheFeed[]]) => {
          if (results[1].length > 0) {
            results[0].application.info.dataPreview = results[1];
          }

          return results[0];
        })
    });
  }

  generateHatLoginLink(id: string, setup: HatApplicationSetup): Observable<string> {
    const redirectUrl = setup.url || setup.iosUrl || '';

    return this.authSvc.user$.map((user: User) => `${user.hatUrl}/#/hatlogin?name=${id}&redirect=${redirectUrl}`);
  }

  closeComponentView(): void {
    this.location.back();
  }

}

import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { HatApiService } from '../core/services/hat-api.service';
import { AuthService } from '../core/services/auth.service';
import { HatApplication, HatApplicationSetup } from './hat-application.interface';
import { SheFeed } from '../she/she-feed.interface';
import { User } from '../user/user.interface';

@Injectable()
export class HatApplicationsService {
  private hatUrl: string;
  private _dataplugs$: ReplaySubject<HatApplication[]> = <ReplaySubject<HatApplication[]>>new ReplaySubject(1);

  constructor(private authSvc: AuthService,
              private hatSvc: HatApiService) {

    this.authSvc.user$
      .filter((user: User) => Boolean(user.fullDomain))
      .do((user: User) => this.hatUrl = user.fullDomain)
      .flatMap(_ => this.getApplicationList('DataPlug'))
      .subscribe((apps: HatApplication[]) => this._dataplugs$.next(apps));
  }

  getApplicationList(kind: string = null): Observable<HatApplication[]> {
    if (kind) {
      return this.hatSvc.getApplicationList()
        .map((apps: HatApplication[]) => apps.filter((app: HatApplication) => app.application.kind.kind === kind));
    } else {
      return this.hatSvc.getApplicationList();
    }
  }

  getApplicationDetails(application: string): Observable<HatApplication> {
    return this.hatSvc.getApplicationList()
      .map((apps: HatApplication[]) => apps.filter(app => app.application.id === application)[0]);
  }

  getApplicationData(application: string): Observable<SheFeed[]> {
    return this.hatSvc.getSheRecords(application);
  }

  disable(id: string): Observable<HatApplication> {
    return this.hatSvc.disableApplication(id);
  }

  generateHatLoginLink(id: string, setup: HatApplicationSetup): string {
    const redirectUrl = setup.url || setup.iosUrl || '';

    return `https://${this.hatUrl}/#/hatlogin?name=${id}&redirect=${redirectUrl}`;
  }

  getAppStatus(app: HatApplication): 'goto' | 'running' | 'fetching' | 'failing' | 'untouched' | 'update' {
    const { setup, enabled, active, needsUpdating, mostRecentData } = app;
    const kind = app.application.kind.kind;

    if (setup && needsUpdating) {
      return 'update';
    } else if (enabled && !active) {
      return 'failing';
    } else if (enabled && active) {
      return !mostRecentData && kind === 'DataPlug' ? 'fetching' : (kind === 'App' ? 'goto' : 'running');
    } else {
      return 'untouched';
    }
  }

  get dataplugs$(): Observable<HatApplication[]> {
    return this._dataplugs$.asObservable();
  }

  get inactiveDataplugs$(): Observable<HatApplication[]> {
    return this.dataplugs$.map((plugs: HatApplication[]) => plugs.filter(plug => !plug.setup));
  }

  get notablesEnabledPlugs$(): Observable<HatApplication[]> {
    return this.dataplugs$
      .map((dps: HatApplication[]) => {
        return dps.filter((plug: HatApplication) => plug.application.id === 'facebook' || plug.application.id === 'twitter');
      })
      .defaultIfEmpty([]);
  }
}

import { Injectable } from '@angular/core';
import { ReplaySubject ,  Observable } from 'rxjs';
import { defaultIfEmpty, filter, flatMap, map, tap } from 'rxjs/operators';
import { HatApiService } from '../core/services/hat-api.service';
import { AuthService } from '../core/services/auth.service';
import { HatApplication, HatApplicationSetup } from './hat-application.interface';
import { SheFeed } from '../she/she-feed.interface';
import { User } from '../user/user.interface';
import { CacheService } from '../core/services/cache.service';

@Injectable()
export class HatApplicationsService {
  private hatUrl: string;
  readonly applicationKey = 'applications';
  readonly applicationMaxAge = 20; // in minutes
  readonly applicationMaxAgeShort = 1; // in minutes
  private _dataplugs$: ReplaySubject<HatApplication[]> = <ReplaySubject<HatApplication[]>>new ReplaySubject(1);

  constructor(private authSvc: AuthService,
              private hatSvc: HatApiService,
              private cacheSvc: CacheService) {

    this.authSvc.user$.pipe(
      filter((user: User) => Boolean(user.fullDomain)),
      tap((user: User) => this.hatUrl = user.fullDomain),
      flatMap(_ => this.getApplicationList('DataPlug'))
    )
    .subscribe((apps: HatApplication[]) => this._dataplugs$.next(apps));
  }

  getApplicationList(kind: string = null): Observable<HatApplication[]> {
    if (kind) {
      return this.getAppList().pipe(
        map((apps: HatApplication[]) => apps.filter((app: HatApplication) => app.application.kind.kind === kind)));
    } else {
      return this.getAppList();
    }
  }

  getAppList(): Observable<HatApplication[]> {
    return this.cacheSvc.get<HatApplication[]>(this.applicationKey, this.getApplicationLisApi(), this.applicationMaxAge, true);
  }

  getApplicationLisApi(): Observable<HatApplication[]> {
    return this.hatSvc.getApplicationList().pipe(tap(
      apps => {
        const hasStatus = this.applicationListHasStatus(apps, ['fetching']);

        this.cacheSvc.store(this.applicationKey, apps, hasStatus ? this.applicationMaxAgeShort : this.applicationMaxAge);
      }
    ));
  }

  getApplicationDetails(application: string): Observable<HatApplication> {
    return this.getAppList()
      .pipe(map((apps: HatApplication[]) => apps.filter(app => app.application.id === application)[0]));
  }

  getApplicationData(endpoint: string, since: number | string, until: number | string): Observable<SheFeed[]> {
      return this.hatSvc.getSheRecords(endpoint, since, until);
  }

  enable(id: string): Observable<HatApplication> {
    return this.hatSvc.setupApplication(id);
  }

  disable(id: string): Observable<HatApplication> {
    this.clearApplicationCache();

    return this.hatSvc.disableApplication(id);
  }

  clearApplicationCache() {
    this.cacheSvc.removeFromCache(this.applicationKey);
  }

  generateHatLoginLink(id: string, setup: HatApplicationSetup): string {
    const redirectUrl = setup.url || setup.iosUrl || '';
    const redirectRumpel = window.location.href.replace('#', '%23');

    return `https://${this.hatUrl}/#/hatlogin?name=${id}&redirect=${redirectUrl}%3Fredirect=${redirectRumpel}`;
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
  applicationListHasStatus(apps: HatApplication[], status: string[]): boolean {
    for (const app of apps) {
      const appStatus = this.getAppStatus(app);
      if (status.indexOf(appStatus) !== -1) {

        return true;
      }
    }

    return false;
  }

  get dataplugs$(): Observable<HatApplication[]> {
    return this._dataplugs$.asObservable();
  }

  get notablesEnabledPlugs$(): Observable<HatApplication[]> {
    return this.dataplugs$.pipe(
      map((dps: HatApplication[]) => {
        return dps.filter((plug: HatApplication) => plug.application.id === 'facebook' || plug.application.id === 'twitter');
      }),
      defaultIfEmpty([])
    );
  }
}

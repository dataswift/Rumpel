import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {HatApplication, HatApplicationSetup} from '../explore/hat-application.interface';
import {AuthService} from '../core/services/auth.service';
import {HatApiService} from '../core/services/hat-api.service';
import {defaultIfEmpty, filter, flatMap, map, tap} from 'rxjs/operators';
import {User} from '../user/user.interface';
import {SheFeed} from '../she/she-feed.interface';
import {HatTool} from './hat-tools.interface';

@Injectable()
export class HatToolsService {
  private hatUrl: string;
  private _tool$: ReplaySubject<HatTool[]> = <ReplaySubject<HatTool[]>>new ReplaySubject(1);

  constructor(private authSvc: AuthService,
              private hatSvc: HatApiService) {

    this.authSvc.user$.pipe(
      filter((user: User) => Boolean(user.fullDomain)),
      tap((user: User) => this.hatUrl = user.fullDomain),
      flatMap(_ => this.getToolList())
    )
      .subscribe((tool: HatTool[]) => this._tool$.next(tool));
  }

  getToolList(toolId: string = null): Observable<HatTool[]> {
      return this.hatSvc.getToolList(toolId)
  }

  getToolDetails(toolId: string): Observable<HatTool> {
    return this.hatSvc.getToolList()
      .pipe(map((tools: HatTool[]) => tools.filter(tool => tool.id === toolId)[0]));
  }

  getApplicationData(endpoint: string): Observable<SheFeed[]> {
    return this.hatSvc.getSheRecords(endpoint);
  }

  getToolData(endpoint: string, since: number | string, until: number | string): Observable<SheFeed[]> {
    return this.hatSvc.getSheRecords(endpoint, since, until);
  }

  enable(id: string): Observable<HatApplication> {
    return this.hatSvc.setupApplication(id);
  }

  disable(id: string): Observable<HatApplication> {
    return this.hatSvc.disableApplication(id);
  }

  generateHatLoginLink(id: string, setup: HatApplicationSetup): string {
    const redirectUrl = setup.url || setup.iosUrl || '';

    return `https://${this.hatUrl}/#/hatlogin?name=${id}&redirect=${redirectUrl}`;
  }

  getToolStatus(tool: HatTool): 'running' | 'untouched' {
    if (tool.status.enabled) {
      return 'running';
    } else {
      return 'untouched'
    }
  }

  get getTool$(): Observable<HatTool[]> {
    return this._tool$.asObservable();
  }

}

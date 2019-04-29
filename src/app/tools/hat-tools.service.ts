import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { HatApiService } from '../core/services/hat-api.service';
import { filter, flatMap, map, tap } from 'rxjs/operators';
import { User } from '../user/user.interface';
import { SheFeed } from '../she/she-feed.interface';
import { HatTool } from './hat-tools.interface';
import { CacheService } from '../core/services/cache.service';

@Injectable()
export class HatToolsService {
  private hatUrl: string;
  private toolKey = 'tools';
  private toolMaxAge = 20; // in minutes
  private _tool$: ReplaySubject<HatTool[]> = <ReplaySubject<HatTool[]>>new ReplaySubject(1);

  constructor(private authSvc: AuthService,
              private hatSvc: HatApiService,
              private cacheSvc: CacheService) {

    this.authSvc.user$.pipe(
      filter((user: User) => Boolean(user.fullDomain)),
      tap((user: User) => this.hatUrl = user.fullDomain),
      flatMap(_ => this.getToolList())
    )
      .subscribe((tool: HatTool[]) => this._tool$.next(tool));
  }

  getToolList(toolId: string = null): Observable<HatTool[]> {
    return this.cacheSvc.get<HatTool[]>(this.toolKey, this.hatSvc.getToolList(toolId), this.toolMaxAge);
  }

  getToolDetails(toolId: string): Observable<HatTool> {
    return this.getToolList()
      .pipe(map((tools: HatTool[]) => tools.filter(tool => tool.id === toolId)[0]));
  }

  getToolData(endpoint: string, since?: number | string, until?: number | string): Observable<SheFeed[]> {
    return this.hatSvc.getSheRecords(endpoint, since, until);
  }

  enable(id: string): Observable<HatTool> {
    this.clearToolCache();

    return this.hatSvc.enableTool(id);
  }

  disable(id: string): Observable<HatTool> {
    this.clearToolCache();

    return this.hatSvc.disableTool(id);
  }

  triggerUpdate(id: string): Observable<number> {
    return this.hatSvc.triggerToolUpdate(id);
  }

  getToolStatus(tool: HatTool): 'running' | 'untouched' {
    if (tool.status.enabled) {
      return 'running';
    } else {
      return 'untouched'
    }
  }

  clearToolCache() {
    this.cacheSvc.removeFromCache(this.toolKey);
  }

  get getTool$(): Observable<HatTool[]> {
    return this._tool$.asObservable();
  }

}

import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {SheFeed} from '../../she/she-feed.interface';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {mergeMap, tap} from 'rxjs/operators';
import * as format from 'date-fns/format';
import {HatToolsService} from '../hat-tools.service';
import {HatTool} from '../hat-tools.interface';

@Component({
  selector: 'rum-tools-details',
  templateUrl: './tools-details.component.html',
  styleUrls: ['./tools-details.component.scss']
})
export class ToolsDetailsComponent implements OnInit {
  public toolDetails$: Observable<HatTool>;
  public dataPreview$: Observable<SheFeed[]>;
  public appStatus: 'running' | 'untouched';
  public appInformation: string[][];

  constructor(private activatedRoute: ActivatedRoute,
              private location: Location,
              private hatToolSvc: HatToolsService) { }

  ngOnInit() {

    this.toolDetails$ = this.activatedRoute.params.pipe(mergeMap(pathParams => {
      const toolId = pathParams['toolId'];

      return this.hatToolSvc.getToolDetails(toolId).pipe(
        tap((tool: HatTool) => {
          this.appStatus = this.hatToolSvc.getToolStatus(tool);

          const { name, url, country } = tool.developer;
          const { version, termsUrl, supportContact } = tool.info;

          this.appInformation = [
            ['provider', name],
            ['website', url],
            ['country', country],
            ['version', version],
            ['last updated', format(tool.info.versionReleaseDate, 'DD/MM/YYYY')],
            ['terms and conditions', termsUrl],
            ['support email', supportContact]
          ];

          if (tool.status.enabled && tool.info.dataPreviewEndpoint) {
            this.dataPreview$ = this.hatToolSvc.getApplicationData(
              // remove the first slash from the endpoint
              tool.info.dataPreviewEndpoint.substr(1, tool.info.dataPreviewEndpoint.length)
            );
          } else {
            this.dataPreview$ = of([]);
          }
        }));
    }));
  }

  disableApp(id: string): void {
    // this.appDetails$ = this.hatToolSvc.disable(id)
    //   .pipe(tap((app: HatTool) => this.appStatus = this.hatToolSvc.getAppStatus(tool)));
  }

  closeComponentView(): void {
    this.location.back();
  }
}

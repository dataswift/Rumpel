import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import { HatTool } from '../hat-tools.interface';
import {HatToolsService} from '../hat-tools.service';

@Component({
  selector: 'rum-tools-list',
  templateUrl: './tools-list.component.html',
  styleUrls: ['./tools-list.component.scss']
})
export class ToolsListComponent implements OnInit {

  public tool$: Observable<HatTool[]>;
  public headerProps$: Observable<{ title: string; headline: string; icon: string; }>;

  constructor(private hatToolService: HatToolsService) { }

  ngOnInit() {
    this.tool$ = this.hatToolService.getToolList();
    this.headerProps$ = of({ title: 'Tools',
    headline: 'Tools and Insights are powered by the Smart HAT Engine (SHE)',
    icon: 'build', })
  }

  statusIcon(tool: HatTool): string {
    switch (this.hatToolService.getToolStatus(tool)) {
      case 'running':
        return 'check_circle';
      default:
        return 'add_circle_outline';
    }
  }

}

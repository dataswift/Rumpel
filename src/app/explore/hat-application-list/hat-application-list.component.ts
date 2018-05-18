import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HatApplicationsService } from '../hat-applications.service';
import { HatApplication } from '../hat-application.interface';

import { Observable } from 'rxjs/Observable';

const HEADLINE_MAP = {
  'App': 'HAT apps are integrated with your HAT data to give you great services.',
  'DataPlug': 'Add new data plugs to your account, or view data from existing plugs.'
};

@Component({
  selector: 'rum-hat-application-list',
  templateUrl: './hat-application-list.component.html',
  styleUrls: ['./hat-application-list.component.scss']
})
export class HatApplicationListComponent implements OnInit {
  public hatApp$: Observable<HatApplication[]>;
  public headerProps$: Observable<{ title: string; headline: string; icon: string; }>;

  constructor(private hatAppSvc: HatApplicationsService,
              public activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.hatApp$ = this.activateRoute.params.flatMap(params => this.hatAppSvc.getApplicationList(params['appKind']));
    this.headerProps$ = this.activateRoute.params.map(params => {
      return {
        title: params['appKind'],
        headline: HEADLINE_MAP[params['appKind']],
        icon: params['appKind'] === 'DataPlug' ? 'settings_input_component' : 'touch_app'
      };
    });
  }

  statusIcon(app: HatApplication): string {
    switch (this.hatAppSvc.getAppStatus(app)) {
      case 'running':
      case 'goto':
        return 'check_circle';
      case 'fetching':
        return 'sync';
      case 'failing':
        return 'sync_problem';
      default:
        return 'add_circle_outline';
    }
  }
}

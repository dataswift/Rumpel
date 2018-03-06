import { Component, OnInit } from '@angular/core';
import { HatApplicationsService } from '../hat-applications.service';
import {HatApplication, HatApplicationContent} from '../hat-application.interface';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'rum-hat-application-list',
  templateUrl: './hat-application-list.component.html',
  styleUrls: ['./hat-application-list.component.scss']
})
export class HatApplicationListComponent implements OnInit {
  public hatApp$: Observable<HatApplicationContent[]>;

  constructor(private hatAppSvc: HatApplicationsService) { }

  ngOnInit() {
    this.hatApp$ = this.hatAppSvc.getApplicationList();
  }

  appStatusMock(): boolean {
    return Math.random() < 0.5;
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { HatApplication } from '../../explore/hat-application.interface';

@Component({
  selector: 'rum-hmi-daas-content',
  templateUrl: './hmi-daas-content.component.html',
  styleUrls: ['./hmi-daas-content.component.scss']
})
export class HmiDaasContentComponent implements OnInit {
  @Input() app: HatApplication;
  @Input() dependencyApps: HatApplication[];

  constructor() { }

  ngOnInit() {
  }

}

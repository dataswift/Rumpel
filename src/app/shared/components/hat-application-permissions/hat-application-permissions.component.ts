import { Component, Input, OnInit } from '@angular/core';
import { HatApplicationContent } from '../../../explore/hat-application.interface';

@Component({
  selector: 'rum-hat-application-permissions',
  templateUrl: './hat-application-permissions.component.html',
  styleUrls: ['./hat-application-permissions.component.scss']
})
export class HatApplicationPermissionsComponent implements OnInit {
  @Input() app: HatApplicationContent;

  constructor() { }

  ngOnInit() {
  }

  toggleCardExpansion(endpoint): void {
    endpoint.expanded = !endpoint.expanded;
  }

}

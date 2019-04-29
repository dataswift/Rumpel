import { Component, Input, OnInit } from '@angular/core';
import { HatApplicationContent } from '../../../explore/hat-application.interface';

@Component({
  selector: 'rum-hat-app-hmi-content',
  templateUrl: './hat-app-hmi-content.component.html',
  styleUrls: ['./hat-app-hmi-content.component.scss']
})
export class HatAppHmiContentComponent implements OnInit {
  @Input() appContent: HatApplicationContent;

  constructor() { }

  ngOnInit() {
  }

  processPermissionRoles(roles: Array<{ role: string; detail?: string; }>): Array<string> {
    return roles.map(role => {
      switch (role.role) {
        case 'namespaceread':
          return `<b>Read</b> data from the ${role.detail} namespace.`;
        case 'namespacewrite':
          return `<b>Write</b> data into the ${role.detail} namespace.`;
        case 'managefiles':
          return `Manage files on ${role.detail} namespace.`;
        case 'applicationmanage':
          return `The app needs to be able to manage ${role.detail} app.`;
        case 'applicationlist':
          return 'The app needs to be able to list other available applications.';
        case 'datadebit':
          return `Create data debit ${role.detail}.`;
        case 'owner':
          return 'This is a Z class app that enables the HAT owner to view, search, browse and organise their HAT data.';
        default:
          return 'Unidentified permission request. Please let us know about this issue.';
      }
    });
  }

}

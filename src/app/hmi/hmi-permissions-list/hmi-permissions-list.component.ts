import { Component, Input, OnInit } from '@angular/core';
import { HatApplicationContent } from '../../explore/hat-application.interface';

@Component({
  selector: 'rum-hmi-permissions-list',
  templateUrl: './hmi-permissions-list.component.html',
  styleUrls: ['./hmi-permissions-list.component.scss']
})
export class HmiPermissionsListComponent implements OnInit {
  @Input() app: HatApplicationContent;

  constructor() { }

  ngOnInit() {
  }

  processPermissionRoles(roles: Array<{ role: string; detail?: string; }>): Array<string> {
    return roles.map(role => {
      switch (role.role) {
        case 'namespaceread':
          return `Read data from the ${role.detail} folder.`;
        case 'namespacewrite':
          return `Write data into the ${role.detail} folder.`;
        case 'managefiles':
          return `Manage files in ${role.detail} folder.`;
        case 'applicationmanage':
          return `Manage ${role.detail} application.`;
        case 'applicationlist':
          return `List other applications' statuses.`;
        case 'datadebit':
          return `Establish a data debit named ${role.detail}.`;
        case 'owner':
          return 'This is a Z class app that enables the HAT owner to view, search, browse and organise their HAT data.';
        default:
          return 'Unidentified permission request. Please let us know about this issue.';
      }
    });
  }

}

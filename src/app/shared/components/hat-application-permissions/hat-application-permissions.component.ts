import { Component, Input, OnInit } from '@angular/core';
import { HatApplicationContent } from '../../../explore/hat-application.interface';
import { groupBy } from 'lodash';

@Component({
  selector: 'rum-hat-application-permissions',
  templateUrl: './hat-application-permissions.component.html',
  styleUrls: ['./hat-application-permissions.component.scss']
})
export class HatApplicationPermissionsComponent implements OnInit {
  @Input() app: HatApplicationContent;
  public readablePermissions: { title: string; text: string; }[];

  constructor() { }

  ngOnInit() {
    this.readablePermissions = this.processPermissionRoles(this.app.permissions.rolesGranted);
  }

  toggleCardExpansion(endpoint): void {
    endpoint.expanded = !endpoint.expanded;
  }

  processPermissionRoles(roles: Array<{ role: string; detail?: string; }>): Array<{ title: string, text: string; }> {
    let readablePermissions = [];
    const { general, read, write, manage } = groupBy(roles, (role: { role: string; detail?: string; }) => {
      if (role.role.indexOf('namespace') > -1) {
        return role.role.replace('namespace', '');
      } else {
        return role.role === 'applicationmanage' ? 'manage' : 'general';
      }
    });

    if (read) {
      readablePermissions = readablePermissions.concat(read.map(role => {
        return {
          title: 'Read access',
          text: `The app needs to be able to read data in ${role.detail} namespace.`
        }
      }));
    }

    if (write) {
      readablePermissions = readablePermissions.concat(write.map(role => {
        return {
          title: 'Write access',
          text: `The app needs to be able to write data in ${role.detail} namespace.`
        }
      }));
    }

    if (manage) {
      readablePermissions = readablePermissions.concat(manage.map(role => {
        return {
          title: 'Manage other applications',
          text: `The app needs to be able to manage ${role.detail} app.`
        }
      }));
    }

    return readablePermissions.concat(general.map(role => {
      switch (role.role) {
        case 'applicationlist':
          return {
            title: 'List application',
            text: 'The app needs to be able to list other available applications.'
          };
        case 'datadebit':
          return {
            title: 'Create data debit',
            text: `Create data debit ${role.detail}. More details below.`
          };
        case 'owner':
          return {
            title: 'Owner access',
            text: 'Warning! The app will have FULL ACCESS to your HAT.'
          };
        default:
          return {
            title: 'Unknown permission',
            text: 'Unidentified permission request. Please let us know about this issue.'
          };
      }
    }));
  }

}

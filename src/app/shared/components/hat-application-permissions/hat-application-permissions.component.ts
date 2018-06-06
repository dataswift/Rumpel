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

  constructor() { }

  ngOnInit() {
  }

  toggleCardExpansion(endpoint): void {
    endpoint.expanded = !endpoint.expanded;
  }

  processPermissionRoles(roles: Array<{ role: string; detail?: string; }>): Array<{ title: string, text: string; }> {
    const readablePermissions = [];
    const { general, read, write, manage } = groupBy(roles, (role: { role: string; detail?: string; }) => {
      if (role.role.indexOf('namespace') > -1) {
        return role.role.replace('namespace', '');
      } else {
        return role.role === 'applicationmanage' ? 'manage' : 'general';
      }
    });

    if (read) {
      readablePermissions.push({
        title: 'Read access',
        text: `The app needs to be able to READ data in ${read.map(r => r.detail).join(', ')} namespace${read.length > 1 ? 's' : ''}.`
      });
    }

    if (write) {
      readablePermissions.push({
        title: 'Write access',
        text: `The app needs to be able to WRITE data in ${write.map(r => r.detail).join(', ')} namespace${write.length > 1 ? 's' : ''}.`
      });
    }

    if (manage) {
      readablePermissions.push({
        title: 'Manage other applications',
        text: `The app needs to be able to manage ${manage.map(r => r.detail).join(', ')} app${manage.length > 1 ? 's' : ''}.`
      });
    }

    return readablePermissions.concat(general.map(role => {
      if (role.role === 'applicationlist') {
        return {
          title: 'List application',
          text: 'The app needs to be able to list other available applications.'
        }
      } else if (role.role === 'datadebit') {
        return {
          title: 'Create data debit',
          text: `Create data debit ${role.detail}. More details below.`
        }
      }
    }));
  }

}

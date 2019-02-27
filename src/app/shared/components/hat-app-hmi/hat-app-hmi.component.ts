import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HatApplication } from '../../../explore/hat-application.interface';

@Component({
  selector: 'rum-hat-app-hmi',
  templateUrl: './hat-app-hmi.component.html',
  styleUrls: ['./hat-app-hmi.component.scss']
})
export class HatAppHmiComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<HatAppHmiComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { title: string; apps: HatApplication[] }) { }

  ngOnInit() {
  }

  processPermissionRoles(roles: Array<{ role: string; detail?: string; }>): Array<string> {
    return roles.map(role => {
      switch (role.role) {
        case 'namespaceread':
          return `<b>Read</b> data from the ${role.detail} namespace.`;
        case 'namespacewrite':
          return `<b>Write</b> data into the ${role.detail} namespace.`;
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

  mapApplicationKind(kind: string): string {
    switch (kind) {
      case 'DataPlug': return 'data plug';
      case 'App':      return 'application';
      case 'Tool':     return 'tool';
    }
  }

}

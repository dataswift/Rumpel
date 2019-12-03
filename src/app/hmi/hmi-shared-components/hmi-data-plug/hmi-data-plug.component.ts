import { Component, Input, OnInit } from '@angular/core';
import { HatApplication } from '../../../explore/hat-application.interface';
import { MatDialog } from '@angular/material';
import { HmiPermissionsDialogComponent } from '../../hmi-permissions-dialog/hmi-permissions-dialog.component';

@Component({
  selector: 'rum-hmi-data-plug',
  templateUrl: './hmi-data-plug.component.html',
  styleUrls: ['./hmi-data-plug.component.scss']
})
export class HmiDataPlugComponent implements OnInit {
  @Input() app: HatApplication;
  @Input() dependencyApps: HatApplication[];

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  handleShowPermissions(): void {
    const dialogRef = this.dialog.open(HmiPermissionsDialogComponent, {
      data: { title: 'HAT Microserver Instructions', apps: [...this.dependencyApps, this.app] }
    });
  }

}

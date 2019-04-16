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

  mapApplicationKind(kind: string): string {
    switch (kind) {
      case 'DataPlug': return 'data plug';
      case 'App':      return 'application';
      case 'Tool':     return 'tool';
    }
  }

}

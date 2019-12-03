import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmiPermissionsDialogComponent } from './hmi-permissions-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import { HmiPermissionsListComponent } from '../hmi-permissions-list/hmi-permissions-list.component';
import { SafeHtmlPipe } from '../../shared/pipes';

describe('HmiPermissionsDialogComponent', () => {
  let component: HmiPermissionsDialogComponent;
  let fixture: ComponentFixture<HmiPermissionsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule ],
      declarations: [ HmiPermissionsDialogComponent, HmiPermissionsListComponent, SafeHtmlPipe ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HmiPermissionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HatAppHmiComponent } from './hat-app-hmi.component';
import { CustomAngularMaterialModule } from '../../../core/custom-angular-material.module';
import { SafeHtmlPipe } from '../../pipes';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

describe('HatAppHmiComponent', () => {
  let component: HatAppHmiComponent;
  let fixture: ComponentFixture<HatAppHmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule ],
      declarations: [ HatAppHmiComponent, SafeHtmlPipe ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HatAppHmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

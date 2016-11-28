/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MixpadComponent } from './mixpad.component';

describe('MixpadComponent', () => {
  let component: MixpadComponent;
  let fixture: ComponentFixture<MixpadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MixpadComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MixpadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

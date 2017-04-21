/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NotableComponent } from './notable.component';

describe('NotableComponent', () => {
  let component: NotableComponent;
  let fixture: ComponentFixture<NotableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

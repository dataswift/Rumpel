/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FbPostComponent } from './fb-post.component';

describe('FbPostComponent', () => {
  let component: FbPostComponent;
  let fixture: ComponentFixture<FbPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbPostComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

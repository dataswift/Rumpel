/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TileSocialComponent } from './tile-social.component';

describe('TileSocialComponent', () => {
  let component: TileSocialComponent;
  let fixture: ComponentFixture<TileSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileSocialComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TileNotablesComponent } from './tile-notables.component';

describe('TileNotablesComponent', () => {
  let component: TileNotablesComponent;
  let fixture: ComponentFixture<TileNotablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileNotablesComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileNotablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

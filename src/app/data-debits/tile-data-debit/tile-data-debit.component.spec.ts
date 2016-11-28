/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TileDataDebitComponent } from './tile-data-debit.component';

describe('TileDataDebitComponent', () => {
  let component: TileDataDebitComponent;
  let fixture: ComponentFixture<TileDataDebitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileDataDebitComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileDataDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TileMapComponent } from './tile-map.component';

describe('TileMapComponent', () => {
  let component: TileMapComponent;
  let fixture: ComponentFixture<TileMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileMapComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

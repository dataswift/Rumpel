import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileMonzoComponent } from './tile-monzo.component';

describe('TileMonzoComponent', () => {
  let component: TileMonzoComponent;
  let fixture: ComponentFixture<TileMonzoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileMonzoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileMonzoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

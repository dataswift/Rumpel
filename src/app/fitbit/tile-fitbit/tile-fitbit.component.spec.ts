import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileFitbitComponent } from './tile-fitbit.component';

describe('TileFitbitComponent', () => {
  let component: TileFitbitComponent;
  let fixture: ComponentFixture<TileFitbitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileFitbitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileFitbitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

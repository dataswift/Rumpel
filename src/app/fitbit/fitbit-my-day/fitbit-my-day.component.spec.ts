import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FitbitMyDayComponent } from './fitbit-my-day.component';

describe('FitbitMyDayComponent', () => {
  let component: FitbitMyDayComponent;
  let fixture: ComponentFixture<FitbitMyDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FitbitMyDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FitbitMyDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

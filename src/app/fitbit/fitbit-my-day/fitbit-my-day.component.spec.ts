import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FitbitMyDayComponent } from './fitbit-my-day.component';
import { RemoveCharsPipe } from '../../shared/pipes/removeChars.pipe';

describe('FitbitMyDayComponent', () => {
  let component: FitbitMyDayComponent;
  let fixture: ComponentFixture<FitbitMyDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FitbitMyDayComponent, RemoveCharsPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FitbitMyDayComponent);
    component = fixture.componentInstance;
    component.fitbitData = { steps: 42 };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

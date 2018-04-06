import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonzoMyDayComponent } from './monzo-my-day.component';

describe('MonzoMyDayComponent', () => {
  let component: MonzoMyDayComponent;
  let fixture: ComponentFixture<MonzoMyDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonzoMyDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonzoMyDayComponent);
    component = fixture.componentInstance;
    component.monzoData = {
      spend_today: 25,
      balance: 51,
      currency: 'GPB'
    };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

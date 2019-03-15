import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordStrengthIndicatorComponent } from './password-strength-indicator.component';

describe('PasswordStrengthIndicatorComponent', () => {
  let component: PasswordStrengthIndicatorComponent;
  let fixture: ComponentFixture<PasswordStrengthIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordStrengthIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordStrengthIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

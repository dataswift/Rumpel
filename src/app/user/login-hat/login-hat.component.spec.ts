import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginHatComponent } from './login-hat.component';

describe('LoginHatComponent', () => {
  let component: LoginHatComponent;
  let fixture: ComponentFixture<LoginHatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginHatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginHatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

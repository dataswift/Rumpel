import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginStandaloneComponent } from './login-standalone.component';

describe('LoginStandaloneComponent', () => {
  let component: LoginStandaloneComponent;
  let fixture: ComponentFixture<LoginStandaloneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginStandaloneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginStandaloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyToggleHelperComponent } from './privacy-toggle-helper.component';

describe('PrivacyToggleHelperComponent', () => {
  let component: PrivacyToggleHelperComponent;
  let fixture: ComponentFixture<PrivacyToggleHelperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacyToggleHelperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyToggleHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

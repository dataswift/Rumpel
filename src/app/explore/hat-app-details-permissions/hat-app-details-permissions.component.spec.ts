import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HatAppDetailsPermissionsComponent } from './hat-app-details-permissions.component';

describe('HatAppDetailsPermissionsComponent', () => {
  let component: HatAppDetailsPermissionsComponent;
  let fixture: ComponentFixture<HatAppDetailsPermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HatAppDetailsPermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HatAppDetailsPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

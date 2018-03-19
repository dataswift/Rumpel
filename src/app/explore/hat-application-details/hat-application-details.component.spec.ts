import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HatApplicationDetailsComponent } from './hat-application-details.component';

describe('HatApplicationDetailsComponent', () => {
  let component: HatApplicationDetailsComponent;
  let fixture: ComponentFixture<HatApplicationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HatApplicationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HatApplicationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

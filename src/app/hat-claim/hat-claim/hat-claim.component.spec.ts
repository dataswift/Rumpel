import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HatClaimComponent } from './hat-claim.component';

describe('HatClaimComponent', () => {
  let component: HatClaimComponent;
  let fixture: ComponentFixture<HatClaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HatClaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HatClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

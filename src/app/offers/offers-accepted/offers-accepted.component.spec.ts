import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersAcceptedComponent } from './offers-accepted.component';

describe('OffersAcceptedComponent', () => {
  let component: OffersAcceptedComponent;
  let fixture: ComponentFixture<OffersAcceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersAcceptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

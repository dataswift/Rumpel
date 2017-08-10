import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferModalComponent } from './offer-modal.component';

describe('OfferModalComponent', () => {
  let component: OfferModalComponent;
  let fixture: ComponentFixture<OfferModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

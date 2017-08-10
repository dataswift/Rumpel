import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferAcceptedStatsComponent } from './offer-accepted-stats.component';

describe('OfferAcceptedStatsComponent', () => {
  let component: OfferAcceptedStatsComponent;
  let fixture: ComponentFixture<OfferAcceptedStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferAcceptedStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferAcceptedStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

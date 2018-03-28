import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferAcceptedStatsComponent } from './offer-accepted-stats.component';
import { DialogService } from '../../core/dialog.service';
import { DataOfferService } from '../data-offer.service';
import { Observable } from 'rxjs/Observable';

describe('OfferAcceptedStatsComponent', () => {
  let component: OfferAcceptedStatsComponent;
  let fixture: ComponentFixture<OfferAcceptedStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferAcceptedStatsComponent ],
      providers: [
        { provide: DialogService, useValue: { } },
        { provide: DataOfferService, useValue: { offersSummary$: Observable.of({}), fetchUserAwareOfferList: () => null } }
      ]
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

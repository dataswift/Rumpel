import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersAcceptedComponent } from './offers-accepted.component';
import { OfferAcceptedStatsComponent } from '../offer-accepted-stats/offer-accepted-stats.component';
import { DialogService } from '../../core/dialog.service';
import { DataOfferService } from '../data-offer.service';
import { Observable } from 'rxjs/Observable';
import {MomentPipe} from '../../shared/pipes/moment.pipe';

describe('OffersAcceptedComponent', () => {
  let component: OffersAcceptedComponent;
  let fixture: ComponentFixture<OffersAcceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersAcceptedComponent, OfferAcceptedStatsComponent, MomentPipe ],
      providers: [
        { provide: DialogService, useValue: { } },
        { provide: DataOfferService, useValue: { offersSummary$: Observable.of({}), fetchUserAwareOfferList: () => null } }
      ]
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

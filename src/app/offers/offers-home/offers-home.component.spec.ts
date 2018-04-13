import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersHomeComponent } from './offers-home.component';
import { OffersComponent } from '../offers-component/offers.component';
import { OffersAcceptedComponent } from '../offers-accepted/offers-accepted.component';
import { OfferAcceptedStatsComponent } from '../offer-accepted-stats/offer-accepted-stats.component';
import { APP_CONFIG } from '../../app.config';
import { AuthService } from '../../core/services/auth.service';
import { DialogService } from '../../core/dialog.service';
import { DataOfferService } from '../data-offer.service';
import { Observable } from 'rxjs/Observable';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import { SharedModule } from '../../shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('OffersHomeComponent', () => {
  let component: OffersHomeComponent;
  let fixture: ComponentFixture<OffersHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule, NoopAnimationsModule, CustomAngularMaterialModule ],
      declarations: [
        OffersHomeComponent,
        OffersComponent,
        OffersAcceptedComponent,
        OfferAcceptedStatsComponent
      ],
      providers: [
        { provide: APP_CONFIG, useValue: { databuyer: { url: 'test.url' } } },
        { provide: DialogService, useValue: { createDialog: () => null } },
        { provide: DataOfferService, useValue: {
          offers$: Observable.of({ availableOffers: [], acceptedOffers: [] }),
          fetchUserAwareOfferList: () => null } },
        { provide: AuthService, useValue: { auth$: Observable.of(false) } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

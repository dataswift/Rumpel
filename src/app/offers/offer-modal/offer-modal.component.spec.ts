import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferModalComponent } from './offer-modal.component';
import { OfferRequirementsComponent } from '../offer-requirements/offer-requirements.component';
import { MomentPipe } from '../../shared/pipes/moment.pipe';
import { ClipboardModule } from 'ngx-clipboard';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';
import { DataOfferService } from '../data-offer.service';
import { of } from 'rxjs';


xdescribe('OfferModalComponent', () => {
  let component: OfferModalComponent;
  let fixture: ComponentFixture<OfferModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ClipboardModule ],
      declarations: [ OfferModalComponent, OfferRequirementsComponent, MomentPipe, SafeHtmlPipe ],
      providers: [
        { provide: DataOfferService, useValue: { offers$: of({ availableOffers: [], acceptedOffers: [] }) } }
      ]
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

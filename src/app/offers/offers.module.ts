import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { OffersRoutingModule } from './offers-routing.module';
import { ClipboardModule } from 'ngx-clipboard';

import { DataOfferService } from './data-offer.service';

import { OffersComponent } from './offers-component/offers.component';

import { OffersAcceptedComponent } from './offers-accepted/offers-accepted.component';
import { OfferModalComponent } from './offer-modal/offer-modal.component';
import { OffersHomeComponent } from './offers-home/offers-home.component';
import { OfferAcceptedStatsComponent } from './offer-accepted-stats/offer-accepted-stats.component';
import { OfferRequirementsComponent } from './offer-requirements/offer-requirements.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OffersRoutingModule,
    ClipboardModule
  ],
  declarations: [
    OffersComponent,
    OffersAcceptedComponent,
    OfferModalComponent,
    OffersHomeComponent,
    OfferAcceptedStatsComponent,
    OfferRequirementsComponent
  ],
  entryComponents: [ OfferModalComponent ],
  providers: [ DataOfferService ]
})
export class OffersModule { }

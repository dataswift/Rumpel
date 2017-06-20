import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { OffersRoutingModule } from './offers-routing.module';



import { OffersComponent } from './offers-component/offers.component';

import { OffersService } from './offers.service';
import { OffersAcceptedComponent } from './offers-accepted/offers-accepted.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OffersRoutingModule
  ],
  declarations: [ OffersComponent, OffersAcceptedComponent ]
})
export class OffersModule { }

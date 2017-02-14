import { NgModule } from '@angular/core';

import { PublicPageRoutingModule } from './public-pages-routing.module';
import { SharedModule } from '../shared/shared.module';

import { PublicProfileComponent } from './public-profile/public-profile.component';

@NgModule({
  imports: [ SharedModule, PublicPageRoutingModule ],
  declarations: [ PublicProfileComponent ]
})
export class PublicPagesModule {}
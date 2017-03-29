import { NgModule } from '@angular/core';

import { PublicPageRoutingModule } from './public-pages-routing.module';
import { SharedModule } from '../shared/shared.module';

import { PublicProfileComponent } from './public-profile/public-profile.component';
import { PublicNotablesComponent } from './public-notables/public-notables.component';

@NgModule({
  imports: [ SharedModule, PublicPageRoutingModule ],
  declarations: [ PublicProfileComponent, PublicNotablesComponent ]
})
export class PublicPagesModule {}

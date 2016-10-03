import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { routing } from './layout.routing';

import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  imports: [ SharedModule, routing ],
  declarations: [ HeaderComponent, SideMenuComponent, FooterComponent, AboutComponent ],
  exports: [ HeaderComponent, SideMenuComponent, FooterComponent ]
})
export class LayoutModule {}

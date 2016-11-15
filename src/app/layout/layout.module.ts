import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { NotificationCentreComponent } from './notification-centre/notification-centre.component';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ HeaderComponent, SideMenuComponent, FooterComponent, AboutComponent, NotificationCentreComponent ],
  exports: [ HeaderComponent, SideMenuComponent, FooterComponent, NotificationCentreComponent ]
})
export class LayoutModule {}

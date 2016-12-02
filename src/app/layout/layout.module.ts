import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { NotificationCentreComponent } from './notification-centre/notification-centre.component';

import { DialogAnchorDirective } from './dialog-anchor.directive';
import { DialogService } from './dialog.service';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ HeaderComponent,
                  SideMenuComponent,
                  FooterComponent,
                  AboutComponent,
                  NotificationCentreComponent,
                  DialogBoxComponent,
                  DialogAnchorDirective ],
  exports: [ HeaderComponent,
            SideMenuComponent,
            FooterComponent,
            NotificationCentreComponent,
            DialogAnchorDirective ],
  providers: [ DialogService ]
})
export class LayoutModule {}

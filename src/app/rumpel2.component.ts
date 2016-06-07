import { Component } from '@angular/core';
import { RumpHeaderComponent } from './rump-header/index';
import { RumpFooterComponent } from './rump-footer/index';
import { RumpSideMenuComponent } from './rump-side-menu/index';

@Component({
  moduleId: module.id,
  selector: 'rumpel',
  templateUrl: 'rumpel2.component.html',
  styleUrls: ['rumpel2.component.css'],
  directives: [RumpHeaderComponent, RumpFooterComponent, RumpSideMenuComponent]
})
export class Rumpel2AppComponent {
  title = 'rumpel2 works!';
}

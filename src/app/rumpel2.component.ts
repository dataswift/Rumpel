import { Component } from '@angular/core';
import { RumpTileInfoComponent } from './rump-tile-info/index';
import { RumpHeaderComponent } from './rump-header/index';
import { RumpFooterComponent } from './rump-footer/index';

@Component({
  moduleId: module.id,
  selector: 'rumpel',
  templateUrl: 'rumpel2.component.html',
  styleUrls: ['rumpel2.component.css'],
  directives: [RumpTileInfoComponent, RumpHeaderComponent, RumpFooterComponent]
})
export class Rumpel2AppComponent {
  title = 'rumpel2 works!';
}

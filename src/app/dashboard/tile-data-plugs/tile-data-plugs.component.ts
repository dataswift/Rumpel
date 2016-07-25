import { Component, OnInit } from '@angular/core';
import { MarketSquareService, AuthService } from '../../services';

@Component({
  moduleId: module.id,
  selector: 'rump-tile-data-plugs',
  templateUrl: 'tile-data-plugs.component.html',
  styleUrls: ['tile-data-plugs.component.css']
})
export class TileDataPlugsComponent implements OnInit {
  public plugs: Array<any>;
  public hatDomain: string;
  public icons: Array<string>;

  constructor(private marketSvc: MarketSquareService, private auth: AuthService) {}

  ngOnInit() {
    this.marketSvc.getDataPlugs().subscribe(plugs => {
      const displayPlugs = plugs.map(plug => {
        let displayPlug = {
          name: plug.name,
          description: plug.description,
          url: plug.url,
          icon: plug.name + '-plug'
        }

        if (plug.name === 'facebook') displayPlug.icon += '.png';
        else displayPlug.icon += '.svg';

        return displayPlug;
      }).sort((p1, p2) => p1.name > p2.name ? 1 : -1);

      this.plugs = displayPlugs;
    });

    this.hatDomain = this.auth.getDomain();
  }

}

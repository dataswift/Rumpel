import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MarketSquareService } from '../market-square.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'rump-tile-data-plugs',
  templateUrl: 'tile-data-plugs.component.html',
  styleUrls: ['tile-data-plugs.component.scss']
})
export class TileDataPlugsComponent implements OnInit {
  public plugs: Array<any>;
  public hatDomain: string;
  public icons: Array<string>;
  @Output() navigateModal = new EventEmitter<any>();

  constructor(private marketSvc: MarketSquareService, private auth: AuthService) {}

  ngOnInit() {
    this.marketSvc.getDataPlugs().subscribe(plugs => {
      const displayPlugs = plugs.map(plug => {
        let displayPlug = {
          name: plug.name,
          description: plug.description,
          url: plug.url.replace('/dataplug', '/hat/authenticate'),
          icon: plug.name.toLowerCase() + '-plug'
        };

        if (plug.name === 'facebook') displayPlug.icon += '.png';
        else displayPlug.icon += '.svg';

        return displayPlug;
      }).sort((p1, p2) => p1.name > p2.name ? 1 : -1);

      this.plugs = displayPlugs;
    });

    this.hatDomain = this.auth.getDomain();
  }

  generatePlugLoginUrl(plug: any) {
    let loginName = plug.name.charAt(0).toUpperCase() + plug.name.slice(1);
    if (plug.name === 'location') return plug.url;
    return `https://${this.hatDomain}/hatlogin?name=${loginName}&redirect=${plug.url}`;
  }

}

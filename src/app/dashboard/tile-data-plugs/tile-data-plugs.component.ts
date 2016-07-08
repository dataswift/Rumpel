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

  constructor(private marketSvc: MarketSquareService, private auth: AuthService) {}

  ngOnInit() {
    this.marketSvc.getDataPlugs().subscribe(plugs => this.plugs = plugs);
    this.hatDomain = this.auth.getDomain();
  }

}

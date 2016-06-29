import { Component, OnInit } from '@angular/core';
import { MarketSquareService, HatApiService } from '../../services';

@Component({
  moduleId: module.id,
  selector: 'rump-tile-data-plugs',
  templateUrl: 'tile-data-plugs.component.html',
  styleUrls: ['tile-data-plugs.component.css']
})
export class TileDataPlugsComponent implements OnInit {
  public plugs: Array<any>;

  constructor(private marketSvc: MarketSquareService) {}

  ngOnInit() {
    this.marketSvc.getDataPlugs().subscribe(plugs => this.plugs = plugs);
  }

}

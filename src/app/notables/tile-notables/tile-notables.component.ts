import { Component, OnInit } from '@angular/core';
import { Notable } from '../../shared/interfaces';
import { NotablesService } from '../notables.service';

@Component({
  selector: 'rump-tile-notables',
  templateUrl: 'tile-notables.component.html',
  styleUrls: ['tile-notables.component.scss']
})
export class TileNotablesComponent implements OnInit {
  public notables: Array<Notable>;
  private sub: any;

  constructor(private notablesSvc: NotablesService) {}

  ngOnInit() {
    this.notables =[];

    this.notablesSvc.notables$.subscribe(notables => {
      this.notables = notables;
    })

    this.notablesSvc.getRecentNotables();
  }

}

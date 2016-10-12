import { Component, OnInit } from '@angular/core';
import { DataDebitService } from '../data-debits.service';

@Component({
  selector: 'rump-tile-data-debit',
  templateUrl: 'tile-data-debit.component.html',
  styleUrls: ['tile-data-debit.component.scss']
})
export class TileDataDebitComponent implements OnInit {
  public debits: Array<any>;

  constructor(private ddSvc: DataDebitService) {}

  ngOnInit() {
    this.debits = [];

    this.ddSvc.loadAllDataDebits().subscribe(dataDebits => {
      this.debits = dataDebits;
    });
  }

}

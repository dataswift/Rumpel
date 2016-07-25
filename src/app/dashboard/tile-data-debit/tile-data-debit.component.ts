import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { DataDebitService } from '../../services';
import { Moment } from '../../pipes';

@Component({
  moduleId: module.id,
  selector: 'rump-tile-data-debit',
  templateUrl: 'tile-data-debit.component.html',
  styleUrls: ['tile-data-debit.component.css'],
  directives: [ROUTER_DIRECTIVES],
  pipes: [Moment]
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

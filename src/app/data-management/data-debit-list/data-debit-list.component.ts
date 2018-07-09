import { Component, OnInit } from '@angular/core';
import { HatApiService } from '../../core/services/hat-api.service';
import { Observable } from 'rxjs';
import { DataDebit } from '../data-debit.interface';

@Component({
  selector: 'rum-data-debit-list',
  templateUrl: './data-debit-list.component.html',
  styleUrls: ['./data-debit-list.component.scss']
})
export class DataDebitListComponent implements OnInit {
  public dataDebits$: Observable<DataDebit[]>;

  constructor(private hatSvc: HatApiService) { }

  ngOnInit() {
    this.dataDebits$ = this.hatSvc.getAllDataDebits();
  }

}

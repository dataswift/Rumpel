import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HatApiService } from '../../core/services/hat-api.service';
import { Observable } from 'rxjs/Observable';
import { DataDebit } from '../data-debit.interface';

@Component({
  selector: 'rum-data-debit-details',
  templateUrl: './data-debit-details.component.html',
  styleUrls: ['./data-debit-details.component.scss']
})
export class DataDebitDetailsComponent implements OnInit {
  public dataDebitDetails$: Observable<DataDebit>;

  constructor(private activatedRoute: ActivatedRoute,
              private hat: HatApiService) { }

  ngOnInit() {
    this.dataDebitDetails$ = this.activatedRoute.params.flatMap(pathParams => {
      const dataDebitId = pathParams['id'];

      return this.hat.getDataDebit(dataDebitId);
    });
  }

}

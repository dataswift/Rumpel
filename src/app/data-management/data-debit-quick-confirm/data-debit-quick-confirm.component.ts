import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HatApiService } from '../../core/services/hat-api.service';
import { Observable } from 'rxjs';
import { DataDebit } from '../data-debit.interface';
import { DialogService } from '../../core/dialog.service';
import { InfoBoxComponent } from '../../core/info-box/info-box.component';

@Component({
  selector: 'rum-data-debit-quick-confirm',
  templateUrl: './data-debit-quick-confirm.component.html',
  styleUrls: ['./data-debit-quick-confirm.component.scss']
})
export class DataDebitQuickConfirmComponent implements OnInit {
  public dataDebitDetails$: Observable<DataDebit>;
  public redirect: string;
  public debitId: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private hat: HatApiService,
              private dialogSvc: DialogService) { }

  ngOnInit() {
    this.redirect = this.route.snapshot.queryParams['redirect'];
    this.debitId = this.route.snapshot.params['id'];

    this.dataDebitDetails$ = this.hat.getDataDebit(this.debitId);

    if (!this.redirect) {
      this.dialogSvc.createDialog<InfoBoxComponent>(InfoBoxComponent, {
        title: 'App configuration missing',
        message: 'Unfortunately, current application did not provide us with enough information to proceed. You can ' +
          'still accept the data debit, but you will not return to the application.'
      });
    }
  }

  enable(debitId): void {
    this.hat.enableDataDebit(debitId).subscribe(
      _ => {
        if (this.redirect) {
          window.location.href = this.redirect;
        } else {
          this.router.navigate(['/data-debit', this.debitId]);
        }
      },
      err => {
        this.dialogSvc.createDialog<InfoBoxComponent>(InfoBoxComponent, {
          title: 'Failed to enable',
          message: `Failed to enable data debit ${debitId}. Please try again later.`
        });
      });
  }

  cancel(): void {
    const fallback = this.route.snapshot.queryParams['fallback'];

    if (fallback) {
      window.location.href = fallback;
    } else {
      this.router.navigate(['/data-debit']);
    }
  }

}

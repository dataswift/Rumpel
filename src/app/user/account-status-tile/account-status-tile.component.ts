import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.interface';
import { AccountStatus } from '../account-status.interface';

@Component({
  selector: 'rump-account-status-tile',
  templateUrl: './account-status-tile.component.html',
  styleUrls: ['./account-status-tile.component.scss']
})
export class AccountStatusTileComponent implements OnInit {
  public username: string;
  public accountStatus: AccountStatus;

  constructor(private userSvc: UserService) { }

  ngOnInit() {
    this.userSvc.user$
      .filter((user: User) => user.authenticated === true)
      .subscribe((user: User) => this.username = user.hatId);

    this.userSvc.getAccountStatus().subscribe((accountStatus: AccountStatus) => this.accountStatus = accountStatus);
  }

  round(value: number, decimalPlaces: number): number {
    const multiplier = Math.pow(10, decimalPlaces);

    return Math.round(value * multiplier) / multiplier;
  }

}

import { Injectable } from '@angular/core';
import { HatApiService } from "../core/services/hat-api.service";
import { forkJoin, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable()
export class HatClaimService {

  constructor(private hat: HatApiService) { }

  submitHatClaim(claimForm, claimToken, password): Observable<any> {
    return forkJoin(
      this.hat.resetPassword(claimToken, { newPassword: password }),
      this.hat.resetPassword("abc", { newPassword: "abc" }) // TODO: replace with Hatters API call through HAT
    ).pipe(
      map(([resetPasswordResponse, hattersResponse]) => null) // TODO: add data mapping
    );
  }
}

import { Injectable } from '@angular/core';
import { HatApiService } from "../core/services/hat-api.service";
import { forkJoin, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable()
export class HatClaimService {

  constructor(private hat: HatApiService) { }

  submitHatClaim(claimForm, claimToken, password, hatClaimRequest): Observable<any> {
    return forkJoin(
      this.hat.resetPassword(claimToken, { newPassword: password }),
      this.hat.informHattersOfHatClaim(claimToken, hatClaimRequest)
    ).pipe(
      map(([resetPasswordResponse, hattersResponse]) => null) // TODO: add data mapping
    );
  }
}

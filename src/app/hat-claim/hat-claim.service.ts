import { Injectable } from '@angular/core';
import { HatApiService } from "../core/services/hat-api.service";
import { forkJoin, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable()
export class HatClaimService {

  constructor(private hat: HatApiService) { }

  submitHatClaim(claimForm): Observable<any> {
    return forkJoin(
      this.hat.resetPassword("abc", { newPassword: "abc" }),
      this.hat.resetPassword("abc", { newPassword: "abc" }) // TODO: replace with Hatters API call through HAT
    ).pipe(
      map(([resetPasswordResponse, hattersResponse]) => null) // TODO: add data mapping
    );
  }
}

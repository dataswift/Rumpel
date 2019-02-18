import { Injectable } from '@angular/core';
import { HatApiService } from '../core/services/hat-api.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class HatClaimService {

  constructor(private hat: HatApiService) { }

  submitHatClaim(claimForm, claimToken, password, hatClaimRequest): Observable<any> {
    return this.hat.claimHat(claimToken, hatClaimRequest).pipe(
      tap(response => console.log('HAT response: ', response)),
      map((response) => null) // TODO: add data mapping
    );
  }
}

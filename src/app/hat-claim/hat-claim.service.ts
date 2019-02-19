import { Injectable } from '@angular/core';
import { HatApiService } from '../core/services/hat-api.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class HatClaimService {

  constructor(private hat: HatApiService) { }

  submitHatClaim(claimToken, hatClaimForm): Observable<any> {
    return this.hat.claimHat(claimToken, hatClaimForm).pipe(
      tap(response => console.log('HAT response: ', response)),
      map((response) => null), // TODO: add data mapping
      catchError((err) => {
        console.log('Error response from HAT API: ', err);

        return throwError(new Error('Request failed'));
      })
    );
  }
}

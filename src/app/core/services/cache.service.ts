import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class CacheService {
  private readonly DEFAULT_MAX_AGE = 30; // in minutes

  constructor(private localStorage: LocalStorageService) {}

  get<T>(key: string, fallback?: Observable<any>, maxAge?: number, needsValidation: boolean = false): Observable<T> {
    let cache$ = this.localStorage.getItem<T>(key);

    if (!maxAge) {
      maxAge = this.DEFAULT_MAX_AGE;
    }

    cache$.subscribe(value => {
      if (value && (value instanceof Array && value.length > 0)) {
        return value;
      } else {
        if (fallback && fallback instanceof Observable) {
          cache$ = fallback.pipe(
            tap((records) => {
              if (!needsValidation) {
                this.store(key, records, maxAge);
              }
            }),
            catchError(() => {
              return of([]);
            }))
        } else {
          return of([]);
        }
      }
    });

    return cache$;
  }

  store(key: string, payload: any, maxAge: number) {
    this.localStorage.setItem(key, payload, maxAge);
  }

  removeFromCache(key: string) {
    this.localStorage.removeItem(key);
  }

  removeAll(): Observable<boolean> {
    return this.localStorage.removeAll();
  }
}

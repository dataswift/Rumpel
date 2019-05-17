import { Injectable } from '@angular/core';
import { Store } from './store';
import { addMinutes } from 'date-fns';
import { HatCache } from './local-storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class SessionStorageService {
  constructor(private store: Store) {}

  public setItem<T>(key: string, payload: T, maxAge: number) {
    const value: HatCache<T> = {value: payload, date: addMinutes(new Date(), maxAge) };

    this.store.setItem(key, value);
  }

  public getItem<T>(key: string): Observable<T> {
    return this.store.getItem(key);
  }

  public removeItem(key: string) {
    this.store.removeItem(key);
  }

}

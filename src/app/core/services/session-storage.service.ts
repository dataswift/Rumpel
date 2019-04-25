import { Injectable } from '@angular/core';
import { Store } from './store';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SessionStorageService {
  constructor(private store: Store) {}

  public setItem<T>(key: string, payload: T) {
    this.store.setItem(key, payload);
  }

  public getItem<T>(key: string): Observable<T> {
    return this.store.getItem(key);
  }

  public removeItem(key: string) {
    this.store.removeItem(key);
  }

}

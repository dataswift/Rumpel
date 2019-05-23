import { Injectable } from '@angular/core';
import { Store } from './store';
import { Observable, of } from 'rxjs';
import { addMinutes } from 'date-fns';

export interface HatCache<T> {
  value: T,
  date: Date
}

@Injectable()
export class LocalStorageService {
  constructor(private store: Store) {}

  public setItem<T>(key: string, payload: T, maxAge: number) {
    const value: HatCache<T> = {value: payload, date: addMinutes(new Date(), maxAge) };
    this.syncWithLocalStorage(key, value);
    this.store.setItem(key, value);
  }

  public getItem<T>(key: string): Observable<T | null> {
    return this.store.getItem(key);
  }

  public removeItem(key: string) {
    this.syncWithLocalStorage(key, null);
    this.store.removeItem(key);
  }

  public removeAll() {
    this.store.clearAll();
  }

  private syncWithLocalStorage(key: string, payload: any) {
    try {
      if (!!payload) {
        localStorage.setItem(key, JSON.stringify(payload));
      } else  {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.log('local storage error:', error);
    }
  }
}

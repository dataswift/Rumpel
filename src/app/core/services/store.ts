import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import { isFuture } from 'date-fns';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class Store extends BehaviorSubject<any> {
  private dispatcher = new Subject();
  constructor( @Inject('localStoragekeys') @Optional() private keys: string[]) {
    super({});
    const initialState: any = keys && keys.length > 0 ? this.getFromLocalStorage(keys) : {};

    this.dispatcher
      .startWith({})
      .scan((state, payload) => this.reducer(state, payload), initialState)
      .subscribe((state) => super.next(state));

  }

  public getAll() {
    return this;
  }

  public clearAll() {
    if (this.keys) {
      this.keys.forEach((key) => {
        try {
          this.removeItem(key);
          localStorage.removeItem(key);
        } catch (error) { }
      })
    }
  }

  public getItem<T>(key: string): Observable <T | null>  {
    if (!!key && typeof key === 'string') {
      return this.map((state) => {
        if (state[key] && isFuture(state[key].date)) {
          return state[key].value
        } else {
          return of(null);
        }
      });
    }
  }

  public setItem<T>(key: string, payload: T) {
    if (!key) { return; }
    this.dispatcher.next({ key, payload });
  }

  public removeItem(key: string) {
    if (!key) { return; }
    this.dispatcher.next({ key, payload: null });
  }

  private reducer(state: any, payload: any) {
    return {
      ...state,
      [payload['key']]: payload['payload']
    };
  }

  private getFromLocalStorage(keys: string[]) {
    const initialState: any = {};
    keys.forEach((key) => {
      try {
        const payload = JSON.parse(localStorage.getItem(key));
        initialState[key] = payload;
      } catch (error) { }
    });

    return initialState;
  }

}

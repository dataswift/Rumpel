import { Subject, Observable } from "rxjs";
import { HatApiService } from "./hat-api.service";
import { uniqBy } from 'lodash';

export abstract class BaseDataService<T> {
  private _data$: Subject<Array<T>> = <Subject<Array<T>>>new Subject();
  public hat: HatApiService;
  public store: {
    data: Array<T>;
    tableId: number;
    idMapping?: { [s: string]: number; };
  };

  constructor(hat: HatApiService) {
    this.hat = hat;
    this.store = {
      data: [],
      tableId: null
    };
  }

  get data$(): Observable<Array<T>> {
    return this._data$.asObservable();
  }

  getRecentData(failedAttempts: number = 0): void {
    if (this.store.data.length > 0) {
      this.pushToStream();
    } else if (this.store.tableId) {
      this.hat.getValuesWithLimit(this.store.tableId)
        .map((rawData: Array<any>) => {
          let typeSafeData = rawData.map(this.mapData);
          return uniqBy(typeSafeData, "id");
        })
        .subscribe((data: Array<T>) => {
          this.store.data = data;

          this.pushToStream();
        });
    } else if (failedAttempts <= 10) {
      Observable.timer(75).subscribe(() => this.getRecentData(++failedAttempts));
    }
  }

  abstract mapData(rawDataItem: any): T

  ensureTableExists(name: string, source: string): void {
    this.hat.getTable(name, source)
      .subscribe(table => {
        if (table === "Not Found") {
          console.log(`${name} of ${source} table does not exist.`);
        } else {
          this.store.tableId = table.id;
        }
      })
  }

  pushToStream(): void {
    return this._data$.next(this.store.data);
  }

}

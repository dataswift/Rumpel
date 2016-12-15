import {BaseDataService} from "./base-data.service";
import {HatApiService} from "./hat-api.service";

export abstract class BaseRumpelDataService<T> extends BaseDataService<T> {
  constructor(hat: HatApiService) {
    super(hat);

    this.store = {
      data: [],
      tableId: null,
      idMapping: null
    };
  }

  ensureTableExists(name: string, source: string, hatDataModel?: any): void {
    this.hat.getTable(name, source)
      .flatMap(table => {
        if (table === "Not Found") {
          return this.hat.postModel(hatDataModel);
        } else {
          this.store.tableId = table.id;
          return this.hat.getModelMapping(table.id);
        }
      })
      .subscribe(idMapping => {
        this.store.idMapping = idMapping;
      });
  }

  postData(dataItem: T, recordName: string): void {
    this.hat.postRecord(dataItem, this.store.idMapping, recordName)
      .subscribe(postedDataArray => {
        this.store.data.unshift(dataItem);

        this.pushToStream();
      })
  }

}

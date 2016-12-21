import { Location } from './location.interface';
import { Moment } from 'moment';
import * as moment from 'moment';

export class Notable {
  public id: number;
  public message: string;
  public kind: string;
  private created_time: Moment;
  private updated_time: Moment;
  private shared: boolean;
  private public_until: Moment;
  public shared_on: Array<string>;

  public authorv1: {
    id?: string;
    name?: string;
    nick?: string;
    phata: string;
    photo_url: string;
  };

  public locationv1: Location;
  public photov1: {
    link: string;
    source: string;
    caption: string;
  };

  constructor(options: any = null, id: number = null) {
    if (id) {
      this.id = id;
    }

    if (options) {
      this.message = options.message;
      this.kind = options.kind;
      this.created_time = moment(options.created_time);
      this.updated_time = moment(options.updated_time);
      this.public_until = options.public_until ? moment(options.public_until) : null;
      this.shared = options.shared === "true" || options.shared === true;
      this.shared_on = options.shared_on ? options.shared_on.split(",") : [];

      if (options.locationv1) {
        this.locationv1 = options.locationv1;
      }

      if (options.authorv1) {
        this.authorv1 = options.authorv1;
      }

      if (options.photov1) {
        this.photov1 = options.photov1;
      }
    } else {
      this.message = '';
      this.kind = 'note';
      this.created_time = moment();
      this.updated_time = moment();
      this.public_until = null;
      this.shared = false;
      this.shared_on = [];
    }
  }

  get isShared(): boolean {
    return this.shared;
  }

  toggleSharing() {
    this.shared = !this.shared;
  }

  addShareDestination(destination: string) {
    this.shared_on.push(destination);
  }

  removeShareDestination(destination: string) {
    let index = this.shared_on.indexOf(destination);

    if (index > -1) {
      this.shared_on.splice(index, 1);
    }
  }

  setExpirationDate(days: number) {
    if (days === 0) {
      this.public_until = null;
    } else {
      this.public_until = moment().add(days, "days");
    }
  }

  prepareToPost(message: string, author: any) {
    this.message = message;
    this.updated_time = moment();
    this.authorv1 = author;
  }
}

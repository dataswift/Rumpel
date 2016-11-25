import { Location } from './location.interface';
import * as moment from 'moment';

export class Notable {
  public id: number;
  public message: string;
  public kind: string;
  private created_time: any;
  private updated_time: any;
  private shared: boolean;
  private public_until: string;
  public shared_on: any;

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
      this.public_until = options.public_until || '';
      this.shared = options.shared === 'true' || options.shared === true;
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
      this.created_time = null;
      this.updated_time = null;
      this.public_until = '';
      this.shared = false;
      this.shared_on = [];
    }
  }

  isShared(): boolean {
    return this.shared;
  }

  share() {
    this.shared = true;
  }

  makePrivate() {
    this.shared = false;
    this.shared_on = [];
    this.public_until = '';
  }

  shareOn(serviceName: string) {
    this.shared_on.push(serviceName);
  }

  stopSharingOn(serviceName: string) {
    let index = this.shared_on.indexOf(serviceName);

    if (index > -1) {
      this.shared_on.splice(index, 1);
    }
  }

  isExpired(): boolean {
    return this.public_until !== '';
  }

  setExpirationDate(days: number) {
    if (days === 0) {
      this.public_until = '';
    } else {
      this.public_until = moment().add(days, "days").format();
    }
  }

  prepareToPost(message: string, author: any) {
    this.message = message;
    this.created_time = this.created_time ? this.created_time.format() : moment().format();
    this.updated_time = moment().format();

    this.authorv1 = author;
  }
}

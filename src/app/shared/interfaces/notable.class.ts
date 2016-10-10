import { Location } from './location.interface';
import * as moment from 'moment';

export class Notable {
  public id: number;
  public message: string;
  public type: string;
  private created_time: any;
  private updated_time: any;
  private public_until: string;
  private shared: Array<string>;

  public author: {
    id?: string;
    name?: string;
    nick?: string;
    phata: string;
    photo_url: string;
  };

  public location: Location;
  public photo: {
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
      this.type = options.type;
      this.created_time = moment(options.created_time);
      this.updated_time = moment(options.updated_time);
      this.public_until = options.public_until || '';
      this.shared = options.shared ? options.shared.split(",") : [];

      if (options.location) {
        this.location = options.location;
      }

      if (options.author) {
        this.author = options.author;
      }

      if (options.photo) {
        this.photo = options.photo;
      }
    } else {
      this.message = '';
      this.type = 'note';
      this.created_time = null;
      this.updated_time = null;
      this.public_until = '';
      this.shared = [];
    }
  }

  isShared(): boolean {
    return this.shared.length > 0;
  }

  shareOn(serviceName: string) {
    this.shared.push(serviceName);

    if (this.public_until === '') {
      this.setExpirationDate(0);
    }
  }

  stopSharingOn(serviceName: string) {
    let index = this.shared.indexOf(serviceName);

    if (index > -1) {
      this.shared.splice(index, 1);
    }

    if (!this.isShared()) {
      this.setExpirationDate(null);
    }
  }

  isExpired(): boolean {
    return this.public_until.length > 1;
  }

  setExpirationDate(days: number) {
    if (days === null) {
      this.public_until = '';
    } else {
      this.public_until = days === 0 ? '0' : moment().add(days, "days").format("X");
    }
  }

  prepareToPost(message: string, author: any) {
    this.message = message;
    this.created_time = this.created_time ? this.created_time.format() : moment().format();
    this.updated_time = moment().format();

    this.author = author;
  }
}

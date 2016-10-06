import { Location } from './location.interface';
import * as moment from 'moment';

export class Notable {
  public message: string;
  public type: string;
  private created_time: any;
  private updated_time: any;
  public public_until: number;
  public shared: Array<string>;

  public author998: {
    id?: string;
    name?: string;
    nick?: string;
    phata: string;
    photo_url: string;
  };

  public location998: Location;
  public photo: {
    link: string;
    source: string;
    caption: string;
  };

  constructor(options: any = null) {
    if (options) {
      this.message = options.message;
      this.type = options.type;
      this.created_time = moment(options.created_time);
      this.updated_time = moment(options.updated_time);
      this.public_until = options.public_until;
      this.shared = options.shared ? options.shared.split(",") : [];

      this.location998 = options.location998;

      this.author998 = options.author998;

      this.photo = options.photo;
    } else {
      this.message = '';
      this.type = 'note';
      this.created_time = null;
      this.updated_time = null;
      this.public_until = 0;
      this.shared = [];
    }
  }

  isShared() {
    return this.shared.length > 0;
  }

  shareOn(serviceName: string) {
    this.shared.push(serviceName);
  }

  stopSharingOn(serviceName: string) {
    let index = this.shared.indexOf(serviceName);

    if (index > -1) {
      this.shared.splice(index, 1);
    }
  }

  prepareToPost(message: string, author: any) {
    this.message = message;
    this.created_time = this.created_time || moment().format();
    this.updated_time = moment().format();

    this.author998 = author;
  }
}

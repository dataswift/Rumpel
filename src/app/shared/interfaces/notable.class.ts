/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Location } from './location.interface';
import { Moment } from 'moment';
import * as moment from 'moment';

export class Notable {
  public id: number;
  public message: string;
  public kind: string;
  public created_time: Moment;
  public updated_time: Moment;
  public shared: boolean;
  public public_until: Moment;
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

  constructor(options: any = null) {
    if (options) {
      this.message = options.message;
      this.kind = options.kind;
      this.created_time = moment(options.created_time);
      this.updated_time = moment(options.updated_time);
      this.public_until = options.public_until ? moment(options.public_until) : null;
      this.shared = options.shared === 'true' || options.shared === true;
      if (options.shared_on) {
        this.shared_on = Array.isArray(options.shared_on) ? options.shared_on : options.shared_on.split(',');
      } else {
        this.shared_on = [];
      }

      if (options.locationv1) {
        this.locationv1 = options.locationv1;
      }

      if (options.authorv1) {
        this.authorv1 = options.authorv1;
      } else {
        this.authorv1 = {
          phata: '',
          photo_url: ''
        };
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
    const index = this.shared_on.indexOf(destination);

    if (index > -1) {
      this.shared_on.splice(index, 1);
    }
  }

  setExpirationDate(days: number) {
    if (days === 0) {
      this.public_until = null;
    } else {
      this.public_until = moment().add(days, 'days');
    }
  }

  prepareToPost(message: string, author: any) {
    this.message = message;
    this.updated_time = moment();
    this.authorv1 = author;
  }
}

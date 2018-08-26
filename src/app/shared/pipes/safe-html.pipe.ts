/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2, 2017
 */

import { Pipe, PipeTransform, Sanitizer, SecurityContext } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  static replaceUrlsWithHtmlLinks(message: string): string {
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

    return message ? message.replace(urlRegex, `<a href='$1' target='_blank'>$1</a>`) : message;
  }

  constructor(private sanitizer: Sanitizer) {}

  transform(message: string, replaceUrls: boolean = false): SafeHtml {
    if (typeof message === 'string') {
      const html = replaceUrls ? SafeHtmlPipe.replaceUrlsWithHtmlLinks(message) : message;

      return this.sanitizer.sanitize(SecurityContext.HTML, html);
    } else {
      return message;
    }
  }

}

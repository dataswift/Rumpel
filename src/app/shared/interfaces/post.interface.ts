/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 2016
 */

interface Link {
  caption: string;
  description: string;
  link: string;
  name: string;
  picture: string;
  fullPicture: string;
}

interface Photo {
  name: string;
  message: string;
  picture: string;
  fullPicture: string;
}

interface Status {
  message: string;
}

export interface Post {
  id: string;
  createdTime: any;
  updatedTime: any;
  statusType: string;
  type: string;
  privacy: { value: string; description: string };
  from: string;
  application: string;
  story: string;
  content: Link | Status | Photo;
}


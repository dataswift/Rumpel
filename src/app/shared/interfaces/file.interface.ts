/*
 * Copyright (C) 2017 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 10, 2017
 */

export interface FileMetadataReq {
  name: string;
  source: string;
  tags?: string[];
  title?: string;
  description?: string;
  dateCreated?: number;
  lastUpdated?: number;
}

export interface FileMetadataRes {
  fileId: string;
  name: string;
  source: string;
  tags?: string[];
  title?: string;
  description?: string;
  dateCreated: number;
  lastUpdated: number;
  status: FileStatus;
  contentUrl?: string;
  contentPublic: boolean;
  permissions: FilePermissions;
}

interface FileStatus {
  status: string;
  size?: number;
}

interface FilePermissions {
  userId: string;
  contentReadable: boolean;
}

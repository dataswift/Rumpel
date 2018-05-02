import { SheFeed } from '../she/she-feed.interface';
import {BundleStructure} from '../shared/interfaces/bundle.interface';

export interface HatApplication {
  application: HatApplicationContent;
  setup: boolean;
  active: boolean;
  needsUpdating?: boolean;
}

export interface HatApplicationContent {
  id: string;
  kind: HatApplicationKind;
  info: HatApplicationInfo;
  permissions: HatApplicationPermissions;
  setup: HatApplicationSetup;
  status: HatApplicationStatus;
}

interface HatApplicationKind {
  url: string;
  iosUrl: string;
  kind: string;
}

interface HatApplicationInfo {
  version: string;
  name: string;
  headline: string;
  description: HatApplicationDescription;
  dataPreview: SheFeed[];
  graphics: HatApplicationGraphics;
  published: boolean;
}

interface HatApplicationDescription {
  text: string;
  markdown: string;
  html: string;
}

interface HatApplicationGraphics {
  banner: HatApplicationGraphicsSize;
  logo: HatApplicationGraphicsSize;
  screenshots: HatApplicationGraphicsSize[];
}

interface HatApplicationGraphicsSize {
  small?: string;
  normal: string;
  large?: string;
  xlarge?: string;
}

interface HatApplicationPermissions {
  rolesGranted: { role: string; detail: string; }[];
  dataRequired?: { bundle: BundleStructure; };
}

interface HatApplicationSetup {
  kind: string;
}

interface HatApplicationStatus {
  compatibility: string;
  recentDataCheckEndpoint: string;
  kind: string;
}

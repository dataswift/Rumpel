import { SheFeed } from '../she/she-feed.interface';
import { BundleStructure } from '../shared/interfaces/bundle.interface';

export interface HatApplication {
  application: HatApplicationContent;
  setup: boolean;
  enabled: boolean;
  active: boolean;
  needsUpdating?: boolean;
  mostRecentData?: string;
}

export interface HatApplicationContent {
  id: string;
  kind: HatApplicationKind;
  info: HatApplicationInfo;
  developer: HatApplicationDeveloper;
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
  dataUsePurpose: string;
  graphics: HatApplicationGraphics;
  published: boolean;
  rating: { score: string; points: number; };
  supportContact: string;
  termsUrl: string;
  updateNotes?: HatApplicationUpdateNotes;
  primaryColor?: string;
}

export interface HatApplicationDeveloper {
  id: string;
  name: string;
  url: string;
  country: string;
}

interface HatApplicationUpdateNotes {
  header: string;
  notes?: Array<string>;
}

export interface HatApplicationDescription {
  text: string;
  markdown: string;
  html: string;
}

export interface HatApplicationGraphics {
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
  rolesGranted: { role: string; detail?: string; }[];
  dataRequired?: HatApplicationDataRequired;
  dataRetrieved?: BundleStructure;
}

interface HatApplicationDataRequired {
  bundle: BundleStructure;
  startDate: string;
  endDate: string;
  rolling: boolean;
}

export interface HatApplicationSetup {
  url?: string;
  iosUrl?: string;
  androidUrl?: string;
  testingUrl?: string;
  onboarding: HatApplicationOnboarding[];
  kind: string;
  dependencies?: string[];
}

interface HatApplicationOnboarding {
  title: string;
  illustration: { normal: string; };
  description: string;
}

interface HatApplicationStatus {
  compatibility: string;
  expectedStatus: number;
  dataPreviewEndpoint: string;
  recentDataCheckEndpoint: string;
  staticDataPreviewEndpoint?: string;
  versionReleaseDate: string;
  statusUrl: string;
  kind: string;
}

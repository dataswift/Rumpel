import { HatApplicationDescription, HatApplicationDeveloper, HatApplicationGraphics } from '../explore/hat-application.interface';
import { SheFeed } from '../she/she-feed.interface';
import { BundleStructure } from '../shared/interfaces/bundle.interface';

export interface HatTool {
  id: string,
  info: HatToolInfo,
  developer: HatApplicationDeveloper,
  status: HatToolStatus,
  dataBundle: BundleStructure,
  trigger: HatToolTrigger
}
interface HatToolInfo {
  version: string,
  versionReleaseDate: string,
  name: string,
  headline: string,
  description: HatApplicationDescription,
  termsUrl: string,
  supportContact: string,
  dataPreview?: SheFeed[],
  graphics: HatApplicationGraphics,
  dataPreviewEndpoint: string
}

interface HatToolStatus {
  available: boolean,
  enabled: boolean,
  lastExecution?: string
  executionStarted?: string
}

interface HatToolTrigger {
  period?: string
  triggerType: string
}


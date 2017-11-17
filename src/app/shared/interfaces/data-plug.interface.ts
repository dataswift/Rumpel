export interface DataPlug {
  uuid: string;
  providerId: string;
  created: number,
  name: string;
  description: string;
  url: string;
  illustrationUrl: string;
  passwordHash: string;
  approved: boolean;
  active: boolean;
}

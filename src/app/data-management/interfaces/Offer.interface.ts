export interface Offer {
  id: string;
  created: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  illustrationUrl: string;
  starts: number;
  expires: number;
  collectFor: number;
  requiredDataDefinition: DataDefinition[];
  requiredMinUser: number;
  requiredMaxUser: number;
  totalUserClaims: number;
  reward: Cash | Service | Voucher;
  owner: Owner;
  claim: Claim | null;
  pii: boolean;
}

export interface Claim {
  status: string; // "claimed", "completed", "rejected", "untouched"
  confirmed: boolean;
  dataDebitId: string | null;
}

interface Owner {
  id: string;
  email: string;
  nick: string;
  firstName: string;
  lastName: string;
}

interface Cash {
  rewardType: string;
  currency: string;
  value: number;
}

interface Service {
  rewardType: string;
  vendor: string;
  vendorUrl: string;
  value: string;
}

interface Voucher {
  rewardType: string;
  vendor: string;
  vendorUrl: string;
  value: string;
  codes: string[];
  codesReusable: boolean;
  cashValue: Cash;
}

interface DataField {
  name: string;
  description: string;
  fields: DataField[];
}

interface DataSet {
  name: string;
  description: string;
  fields: DataField[];
}

interface DataDefinition {
  source: string;
  datasets: DataSet[];
}
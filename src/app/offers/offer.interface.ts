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
  requiredDataDefinition: DataDefinition[] | DataBundle;
  dataConditions?: DataBundle;
  requiredMinUser: number;
  requiredMaxUser: number;
  totalUserClaims: number;
  pii: boolean;
  reward: Cash | Service | Voucher;
  owner: Owner;
  claim: Claim | null;
}

export interface Claim {
  dateCreated: number;
  dateRedeemed: number | null;
  status: string; // "claimed", "completed", "rejected", "untouched", "failed", "redeemed"
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

interface DataBundle {
  name: string;
  bundle: { [bundleVersion: string]: PropertyQuery };
}

interface PropertyQuery {
  endpoints: EndpointQuery[];
  orderBy?: string;
  ordering: string;
  limit?: number;
}

interface EndpointQuery {
  endpoint: string;
  mapping: { [fieldName: string]: string };
  filters?: any;
  links?: EndpointQuery[];
}

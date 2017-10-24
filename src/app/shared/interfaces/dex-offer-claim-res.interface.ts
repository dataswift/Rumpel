export interface DexOfferClaimRes {
  offerId: string;
  user: { address: string; publicKey: string; };
  relationship: string;
  confirmed: boolean;
  dataDebitId: string;
  dateCreated: number;
}

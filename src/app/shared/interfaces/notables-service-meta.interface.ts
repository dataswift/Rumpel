import { Moment } from 'moment';

export interface NotablesServiceMeta {
  phata: string;
  offerClaimed: boolean;
  userMessage: string;
  dataDebit?: DataDebitMeta;
  canPost: Array<string>;
  activeIntegrations: Array<ActiveIntegrations>;
}

interface DataDebitMeta {
  id: string;
  confirmed: boolean;
  dateCreated: Moment;
}

interface ActiveIntegrations {
  name: string;
  logoUrl: string;
}

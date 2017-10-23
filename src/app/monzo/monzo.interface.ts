import { Moment } from 'moment';

export interface Monzo {
  dateTime: Moment;
  balance: number;
  currency: string;
  spend_today: number;
}

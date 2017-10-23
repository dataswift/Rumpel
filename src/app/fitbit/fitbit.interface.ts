import { Moment } from 'moment';

export interface Fitbit {
  dateTime: Moment;
  steps: number;
  restingHeartRate: number;
  sleep: number;
}

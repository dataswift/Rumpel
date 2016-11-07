import * as moment from 'moment';
import { Moment } from 'moment';

export class ExpandedTime {
  public timestamp: Moment;
  public unixDayStart: number;

  constructor(time: Moment) {
    this.timestamp = time;
    this.unixDayStart = moment(time).startOf('day').unix();
  }
}

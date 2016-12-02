import { Moment } from 'moment';

export interface Event {
  id?: string;
  calendarName: string;
  title: string;
  description?: string;
  start: Moment;
  end?: Moment;
  allDay: boolean;
  location?: string;
  organiser?: string;
  attendees?: string;
  link?: string;
}
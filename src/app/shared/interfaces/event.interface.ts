export interface Event {
  id?: string;
  name: string;
  description?: string;
  start: any;
  end?: any;
  rsvp: string;
  calendarName: string;
  organiser?: string;
  attendees?: string;
}
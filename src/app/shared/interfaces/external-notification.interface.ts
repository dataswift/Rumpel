export interface ExternalNotification {
  notice: {
    id: number;
    message: string;
    dateCreated: number;
    target: any;
  };
  received: number;
  read: number;
}

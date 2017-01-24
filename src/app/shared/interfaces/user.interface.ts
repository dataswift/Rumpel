export interface User {
  sub: string;
  resource: string;
  accessScope: string;
  iss: string;
  client: string;
  exp: number;
  authenticated?: boolean;
  token?: string;
}

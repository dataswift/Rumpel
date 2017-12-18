export interface PasswordChangeFailureResInterface {
  error: string;
  message: { [errorObj: string]: Message[] };
}

interface Message {
  msg: string[];
  args: string[];
}

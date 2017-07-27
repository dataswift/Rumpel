import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GlobalMessagingService {

  private messageSource = new Subject<string>();

  message$ = this.messageSource.asObservable();

  sendMessage(message: string): void {
    this.messageSource.next(message);
  }

}

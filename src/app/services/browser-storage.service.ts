import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

const TOKEN_NAME = 'token';

@Injectable()
export class BrowserStorageService {
  private remember = false;
  private sessionStoreAvailable = false;
  private localStoreAvailable = false;

  static testSessionStorage(): boolean {
    const test = 'test';
    try {
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);

      return true;
    } catch (e) {
      return false;
    }
  }

  static testLocalStorage(): boolean {
    const test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);

      return true;
    } catch (e) {
      return false;
    }
  }

  constructor(private cookieSvc: CookieService) {
    cookieSvc.delete('lastLoginPHATA'); // Some old cookie cleanup TODO: remove in the future

    this.sessionStoreAvailable = BrowserStorageService.testSessionStorage();
    this.localStoreAvailable = BrowserStorageService.testLocalStorage();
  }

  set rememberMe(remember: boolean) {
    this.remember = remember;
  }

  getAuthToken(): string {
    return this.cookieSvc.get(TOKEN_NAME) || sessionStorage.getItem(TOKEN_NAME);
  }

  setAuthToken(token: string) {
    if (this.remember) {
      this.cookieSvc.set(TOKEN_NAME, token);
    } else if (this.sessionStoreAvailable) {
      sessionStorage.setItem(TOKEN_NAME, token);
    }
  }

  removeAuthToken(): void {
    this.cookieSvc.delete(TOKEN_NAME);
    window.sessionStorage.removeItem(TOKEN_NAME);
  }

  getItem(key: string): string {
    if (this.localStoreAvailable) {
      return JSON.parse(localStorage.getItem(key));
    } else {
      return null;
    }
  }

  setItem(key: string, data: any): boolean {
    if (this.localStoreAvailable) {
      localStorage.setItem(key, JSON.stringify(data));

      return true;
    } else {
      return false;
    }
  }

  removeItem(key): boolean {
    if (this.localStoreAvailable) {
      localStorage.removeItem(key);

      return true;
    } else {
      return false;
    }
  }

}

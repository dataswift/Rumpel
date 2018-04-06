import { TestBed, inject } from '@angular/core/testing';
import { BrowserStorageService } from './browser-storage.service';
import { CookieService } from 'angular2-cookie/core';

describe('LocalStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ BrowserStorageService, CookieService ]
    });
  });

  it('should ...', inject([BrowserStorageService], (service: BrowserStorageService) => {
    expect(service).toBeTruthy();
  }));
});

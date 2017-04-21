import { TestBed, inject } from '@angular/core/testing';
import { BrowserStorageService } from './browser-storage.service';

describe('LocalStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowserStorageService]
    });
  });

  it('should ...', inject([BrowserStorageService], (service: BrowserStorageService) => {
    expect(service).toBeTruthy();
  }));
});

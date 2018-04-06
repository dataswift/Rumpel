import { TestBed, inject } from '@angular/core/testing';

import { FileService } from './file.service';
import { APP_CONFIG } from '../app.config';
import { HatApiService } from '../core/services/hat-api.service';

describe('FileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FileService,
        { provide: APP_CONFIG, useValue: {} },
        { provide: HatApiService, useValue: {} }
      ]
    });
  });

  it('should be created', inject([FileService], (service: FileService) => {
    expect(service).toBeTruthy();
  }));
});

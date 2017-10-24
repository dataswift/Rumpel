import { TestBed, inject } from '@angular/core/testing';

import { DexApiService } from './dex-api.service';

describe('DexApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DexApiService]
    });
  });

  it('should be created', inject([DexApiService], (service: DexApiService) => {
    expect(service).toBeTruthy();
  }));
});

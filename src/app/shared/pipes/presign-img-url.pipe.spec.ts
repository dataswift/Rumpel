import { PresignImgUrlPipe } from './presign-img-url.pipe';
import { Observable } from 'rxjs/Observable';
import {inject, TestBed} from '@angular/core/testing';
import { HatApiV2Service } from '../../services/hat-api-v2.service';

describe('PresignImgUrlPipe', () => {
  let pipe;

  const hatApiServiceStub = {
    getFileMetadata: (path: string) => Observable.of({})
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ PresignImgUrlPipe, { provide: HatApiV2Service, useValue: hatApiServiceStub }]
    });
  });

  beforeEach(inject([PresignImgUrlPipe], p => pipe = p));

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});

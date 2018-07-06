import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../app.config';
import { HatApiService } from '../core/services/hat-api.service';
import { FileMetadataReq, FileMetadataRes } from '../shared/interfaces/file.interface';
import { Observable, ReplaySubject, Subscription, fromEvent } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Injectable()
export class FileService {
  private _file$: ReplaySubject<FileMetadataRes> = <ReplaySubject<FileMetadataRes>>new ReplaySubject(1);
  private fileReader: FileReader;
  private fileLoadSub: Subscription;

  constructor(@Inject(APP_CONFIG) private _config: AppConfig,
              private hat: HatApiService) { }

  get file$(): Observable<FileMetadataRes> {
    return this._file$.asObservable();
  }

  setFileReader(file: File): void {
    this.fileReader = new FileReader();
    const fileMetadata: FileMetadataReq = {
      name: file.name,
      source: 'rumpel'
    };

    this.fileLoadSub = fromEvent(this.fileReader, 'load')
      .pipe(flatMap((ev: Event) => this.hat.uploadFile(this.fileReader.result, fileMetadata, file.type)))
      .subscribe((result: FileMetadataRes) => {
        this._file$.next(result);
      });
  }

  initUpload(file: File): void {
    if (this.fileReader) {
      this.fileReader.readAsArrayBuffer(file);
    }
  }
}

import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG, AppConfig} from '../app.config';
import {HatApiV2Service} from './hat-api-v2.service';
import {FileMetadataReq, FileMetadataRes} from '../shared/interfaces/file.interface';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class FileService {
  private _file$: ReplaySubject<FileMetadataRes> = <ReplaySubject<FileMetadataRes>>new ReplaySubject(1);
  private fileReader: FileReader;
  private boo: Subscription;

  constructor(@Inject(APP_CONFIG) private _config: AppConfig,
              private hat: HatApiV2Service) { }

  get file$(): Observable<FileMetadataRes> {
    return this._file$.asObservable();
  }

  setFileReader(file: File): void {
    this.fileReader = new FileReader();
    const fileMetadata: FileMetadataReq = {
      name: file.name,
      source: 'rumpel'
    };

    this.boo = Observable.fromEvent(this.fileReader, 'load')
      .flatMap((ev: Event) => this.hat.uploadFile(this.fileReader.result, fileMetadata, file.type))
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

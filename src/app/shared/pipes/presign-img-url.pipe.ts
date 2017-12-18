import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HatApiV2Service } from '../../services/hat-api-v2.service';
import { FileMetadataRes } from '../interfaces/file.interface';

@Pipe({
  name: 'presignImgUrl'
})
export class PresignImgUrlPipe implements PipeTransform {

  constructor(private hat: HatApiV2Service) {}

  transform(link: string, isPublic: boolean): Observable<string> {
    if (isPublic) {
      return Observable.of(link);
    } else {
      return this.hat.getFileMetadata(link.split('/').pop())
        .map((fileMetadata: FileMetadataRes) => fileMetadata.contentUrl);
    }
  }

}

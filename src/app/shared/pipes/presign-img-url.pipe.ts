import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HatApiService } from '../../services/hat-api.service';
import { FileMetadataRes } from '../interfaces/file.interface';

@Pipe({
  name: 'presignImgUrl'
})
export class PresignImgUrlPipe implements PipeTransform {

  constructor(private hat: HatApiService) {}

  transform(link: string, isPublic: boolean): Observable<string> {
    if (link && isPublic) {
      return Observable.of(link);
    } else if (link) {
      return this.hat.getFileMetadata(link.split('/').pop())
        .map((fileMetadata: FileMetadataRes) => fileMetadata.contentUrl);
    } else {
      return Observable.empty();
    }
  }

}

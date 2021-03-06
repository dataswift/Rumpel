import { Pipe, PipeTransform } from '@angular/core';
import { Observable, EMPTY, of } from 'rxjs';
import { HatApiService } from '../../core/services/hat-api.service';
import { FileMetadataRes } from '../interfaces/file.interface';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'presignImgUrl'
})
export class PresignImgUrlPipe implements PipeTransform {
  constructor(private hat: HatApiService) {}

  transform(link: string, isPublic: boolean): Observable<string> {
    if (link && isPublic) {
      return of(link);
    } else if (link) {
      return this.hat.getFileMetadata(link.split('/').pop())
        .pipe(map((fileMetadata: FileMetadataRes) => fileMetadata.contentUrl));
    } else {
      return EMPTY;
    }
  }

}

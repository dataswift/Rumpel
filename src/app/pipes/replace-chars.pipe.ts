import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceChars'
})
export class ReplaceCharsPipe implements PipeTransform {

  transform(str: string, args?: any): string {
    return str.replace(/_/g, " ");
  }

}

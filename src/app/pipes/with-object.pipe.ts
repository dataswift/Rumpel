import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'withObject'
})
export class WithObjectPipe implements PipeTransform {

  transform(value: any, args?: string[]): any {
    let keys = [];
    for (let key in value) {
      keys.push({ key: key, value: value[key] });
    }
    return keys;
  }

}

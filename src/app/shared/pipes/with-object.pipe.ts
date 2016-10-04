import { Pipe, PipeTransform } from '@angular/core';
import { Node } from '../interfaces';

@Pipe({
  name: 'withObject'
})
export class WithObjectPipe implements PipeTransform {

  transform(value: any, args?: string[]): any {
    let keys = [];
    for (let key in value) {
      if (typeof value[key] === 'string') {
        keys.push(new Node(key, value[key], null));
      } else {
        keys.push(new Node(key, null, value[key]));
      }
    }
    return keys;
  }

}

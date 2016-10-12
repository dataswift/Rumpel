import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitMembers'
})
export class LimitMembersPipe implements PipeTransform {

  transform(value: Array<any>, args?: any): any {
    if (!value) return value;
    return args ? value.slice(0, args) : value.slice(0, 5);
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitMembers'
})
export class LimitMembersPipe implements PipeTransform {

  transform(value: Array<any>, args?: any): any {

    return value.slice(0, 5);
  }

}

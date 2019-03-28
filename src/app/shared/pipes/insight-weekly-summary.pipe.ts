import {Pipe, PipeTransform} from '@angular/core';
import {SheNestedStructure} from '../../she/she-feed.interface';

@Pipe({
  name: 'InsightWeeklySummary'
})
export class InsightWeeklySummaryPipe implements PipeTransform {

  transform(structure: { [key: string]: SheNestedStructure[] } ): { source: string; content: string; badge: string; }[] {
    return Object.keys(structure).map( (key) => {
      return { source: key, content: structure[key][0].content, badge: structure[key][0].badge }
    })

  }

}

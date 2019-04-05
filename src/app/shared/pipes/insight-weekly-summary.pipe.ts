import {Pipe, PipeTransform} from '@angular/core';
import {SheNestedStructure} from '../../she/she-feed.interface';

@Pipe({
  name: 'InsightWeeklySummary'
})
export class InsightWeeklySummaryPipe implements PipeTransform {

  transform(structure: { [key: string]: SheNestedStructure[] } ): { source: string; content: string; badge: string; }[] {
    const arr = [];
    let hasSentiment = false;
    let hasFitbit = false;
    let contentSentiment = '';
    let badgeSentiment = '';
    let contentFitbit = '';
    let badgeFitbit = '';

    Object.keys(structure).map( (key) => {
      if (key.includes('sentiment')) {
        contentSentiment += structure[key][0].content + '\n';
        badgeSentiment += structure[key][0].badge + '\n';
        hasSentiment = true;
      } else if (key.includes('fitbit')) {
        contentFitbit += structure[key][0].content + '\n';
        badgeFitbit += structure[key][0].badge + '\n';
        hasFitbit = true;
      } else {
        arr.push({ source: key, content: structure[key][0].content, badge: structure[key][0].badge });
      }

    });

    if (hasSentiment) {
      arr.push({ source: 'sentiment', content: contentSentiment.trim(), badge: badgeSentiment });
    }
    if (hasFitbit) {
      arr.push({ source: 'fitbit', content: contentFitbit.trim(), badge: badgeFitbit });
    }

    return arr

  }

}

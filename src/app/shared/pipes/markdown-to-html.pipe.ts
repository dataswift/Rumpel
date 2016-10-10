import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';

@Pipe({
  name: 'markdownToHtml'
})
export class MarkdownToHtmlPipe implements PipeTransform {
  private md: any;

  constructor() {
    this.md = marked.setOptions({});
  }

  transform(mdString: string): string {
    let htmlString = this.md.parse(mdString);
    return htmlString;
  }

}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {HatApiService} from '../../../core/services/hat-api.service';
import {HttpResponse} from '@angular/common/http';

const TITLE_MAP = {
  'terms-of-service': 'Terms of Service',
  'privacy-policy': 'Privacy Policy'
};

const CONTENT_MAP = {
  'terms-of-service': `https://raw.githubusercontent.com/Hub-of-all-Things/exchange-assets/master/legal/hat-terms-of-service.md`,
  'privacy-policy': 'https://raw.githubusercontent.com/Hub-of-all-Things/exchange-assets/master/legal/hat-privacy-policy.md'
};

@Component({
  selector: 'rum-markdown-view',
  templateUrl: './markdown-view.component.html',
  styleUrls: ['./markdown-view.component.scss']
})
export class MarkdownViewComponent implements OnInit {
  public markdownProps$: Observable<{ title: string; content: string; }>;
  public markdownContent$: Observable<string>;

  constructor(private activatedRoute: ActivatedRoute,
              private hatSvc: HatApiService) { }

  ngOnInit() {
    this.markdownProps$ = this.activatedRoute.params.pipe(map(params => {
      this.markdownContent$ = this.getMarkdownContent(CONTENT_MAP[params['termsId']]);

      return {
        title: TITLE_MAP[params['termsId']],
        content: CONTENT_MAP[params['termsId']],
      };
    }));

  }

  getMarkdownContent(path: string): Observable<string> {
    return this.hatSvc.getMarkDownContent(path).pipe(
      map((res: HttpResponse<any>) => res.body),
      catchError(error => of(false))
    );
  }

}


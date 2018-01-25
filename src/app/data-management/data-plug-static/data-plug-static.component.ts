import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaticDataService } from '../../services/static-data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'rum-data-plug-static',
  templateUrl: './data-plug-static.component.html',
  styleUrls: ['./data-plug-static.component.scss']
})
export class DataPlugStaticComponent implements OnInit {
  public data$: Observable<Array<Array<any>>>;

  constructor(private route: ActivatedRoute,
              private staticDataSvc: StaticDataService) { }

  ngOnInit() {
    this.data$ = this.staticDataSvc.data$;

    this.route.parent.params.subscribe(routeParams => {
      this.staticDataSvc.fetchData(routeParams['provider'] || '');
    });
  }

}

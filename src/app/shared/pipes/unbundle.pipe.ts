import { Pipe, PipeTransform } from '@angular/core';
import { EndpointQuery, PropertyQuery } from '../interfaces/bundle.interface';
import { flatten, uniqBy, values } from 'lodash';

@Pipe({
  name: 'unbundle'
})
export class UnbundlePipe implements PipeTransform {

  transform(bundle: { [bundleVersion: string]: PropertyQuery } ): { title: string; fields: string[]; expanded?: boolean; }[] {
    // Get a nested array of EndpointQueries
    const arr: EndpointQuery[][] = values(bundle).map((propertyQuery: PropertyQuery) => propertyQuery.endpoints);

    // Reformat for easy parsing in the template
    return flatten(arr).map((endpointQuery: EndpointQuery) => {
      return {
        title: endpointQuery.endpoint.replace('/', ' '),
        fields: endpointQuery.mapping ? uniqBy(Object.keys(endpointQuery.mapping), path => path.split('.')[0]) : ['ALL']
      };
    });
  }

}

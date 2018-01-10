/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import {
  Injectable, ViewContainerRef, ComponentRef, Injector,
  ReflectiveInjector, ComponentFactoryResolver, Type
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class DialogService {
  private vcRef: ViewContainerRef;
  private injector: Injector;
  private resolver: ComponentFactoryResolver;
  public activeInstances = 0;

  constructor() { }

  registerViewContainerRef(vcRef: ViewContainerRef): void {
    this.vcRef = vcRef;
  }

  registerInjector(injector: Injector): void {
    this.injector = injector;
  }

  registerResolver(resolver: ComponentFactoryResolver) {
    this.resolver = resolver;
  }

  createDialog<T>(component: Type<T>, parameters?: Object): Observable<ComponentRef<T>> {
    const componentFactory = this.resolver.resolveComponentFactory<T>(component);
    const componentRef$ = <ReplaySubject<ComponentRef<T>>>new ReplaySubject();

    const childInjector = ReflectiveInjector.resolveAndCreate([], this.injector);
    const componentRef: ComponentRef<T> = this.vcRef.createComponent<T>(componentFactory, 0, childInjector);

    Object.assign(componentRef.instance, parameters);
    this.activeInstances++;

    componentRef.instance['destroy'] = () => {
      this.activeInstances--;
      componentRef.destroy();
    };

    componentRef$.next(componentRef);
    componentRef$.complete();

    return componentRef$.asObservable();
  }
}

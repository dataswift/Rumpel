/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 2016
 */

import { Directive, ViewContainerRef, Injector, ComponentFactoryResolver } from '@angular/core';
import { DialogService } from './dialog.service';

@Directive({
  selector: '[rumDialogAnchor]'
})
export class DialogAnchorDirective {

  constructor(private viewContainer: ViewContainerRef,
              private resolver: ComponentFactoryResolver,
              private injector: Injector,
              private dialogSvc: DialogService) {

    this.dialogSvc.registerViewContainerRef(this.viewContainer);
    this.dialogSvc.registerResolver(resolver);
    this.dialogSvc.registerInjector(this.injector);
  }
}

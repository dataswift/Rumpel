import {Directive, ViewContainerRef, Injector, ComponentFactoryResolver} from '@angular/core';
import { DialogService } from './dialog.service';

@Directive({
  selector: '[rumpDialogAnchor]'
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

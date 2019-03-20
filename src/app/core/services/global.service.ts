import { isPlatformBrowser } from '@angular/common';
import { ClassProvider, FactoryProvider, InjectionToken, PLATFORM_ID } from '@angular/core';

/* Create a new injection token for injecting the window into a component. */
export const WINDOW = new InjectionToken('WindowToken');
export const DOCUMENT = new InjectionToken('WindowToken');


/* Define abstract class for obtaining reference to the global window object. */
export abstract class GlobalRef {

  get nativeWindow(): Window | Object {
    throw new Error('Not implemented.');
  }

  get nativeDocument(): Document | Object {
    throw new Error('Not implemented.');
  }

}

/* Define class that implements the abstract class and returns the native window object. */
export class BrowserGlobalRef extends GlobalRef {

  constructor() {
    super();
  }

  get nativeWindow(): Window | Object {
    return window;
  }

  get nativeDocument(): Document | Object {
    return document;
  }

}

/* Create an factory function that returns the native window object. */
export function windowFactory(windowRef: GlobalRef, platformId: Object): Window | Object {
  if (isPlatformBrowser(platformId)) {
    return windowRef.nativeWindow;
  }

  return {};
}

export function documentFactory(documentRef: GlobalRef, platformId: Object): Window | Object {
  if (isPlatformBrowser(platformId)) {
    return documentRef.nativeDocument;
  }

  return {};
}
/* Create a injectable provider for the WindowRef token that uses the BrowserWindowRef class. */
const browserGlobalProvider: ClassProvider = {
  provide: GlobalRef,
  useClass: BrowserGlobalRef
};

/* Create an injectable provider that uses the windowFactory function for returning the native window object. */
const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: windowFactory,
  deps: [ GlobalRef, PLATFORM_ID ]
};

const documentProvider: FactoryProvider = {
  provide: DOCUMENT,
  useFactory: documentFactory,
  deps: [ GlobalRef, PLATFORM_ID ]
};

/* Create an array of providers. */
export const WINDOW_PROVIDERS = [
  browserGlobalProvider,
  windowProvider,
  documentProvider
];

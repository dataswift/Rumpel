import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { Rumpel2AppComponent } from '../app/rumpel2.component';

beforeEachProviders(() => [Rumpel2AppComponent]);

describe('App: Rumpel2', () => {
  it('should create the app',
      inject([Rumpel2AppComponent], (app: Rumpel2AppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'rumpel2 works!\'',
      inject([Rumpel2AppComponent], (app: Rumpel2AppComponent) => {
    expect(app.title).toEqual('rumpel2 works!');
  }));
});

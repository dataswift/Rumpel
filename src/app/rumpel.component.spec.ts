import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { RumpelAppComponent } from '../app/rumpel.component';

beforeEachProviders(() => [RumpelAppComponent]);

describe('App: Rumpel2', () => {
  it('should create the app',
      inject([RumpelAppComponent], (app: RumpelAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'rumpel2 works!\'',
      inject([RumpelAppComponent], (app: RumpelAppComponent) => {
    expect(app.title).toEqual('rumpel2 works!');
  }));
});

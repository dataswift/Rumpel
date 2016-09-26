import { RumpelMigrationPage } from './app.po';

describe('rumpel-migration App', function() {
  let page: RumpelMigrationPage;

  beforeEach(() => {
    page = new RumpelMigrationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

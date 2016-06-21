import { RumpelPage } from './app.po';

describe('rumpel App', function() {
  let page: RumpelPage;

  beforeEach(() => {
    page = new RumpelPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

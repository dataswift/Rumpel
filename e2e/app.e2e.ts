import { Rumpel2Page } from './app.po';

describe('rumpel2 App', function() {
  let page: Rumpel2Page;

  beforeEach(() => {
    page = new Rumpel2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('rumpel2 works!');
  });
});

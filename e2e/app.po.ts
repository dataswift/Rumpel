export class Rumpel2Page {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('rumpel2-app h1')).getText();
  }
}

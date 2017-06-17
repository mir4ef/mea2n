import { Mea2nPage } from './app.po';

describe('mea2n App', () => {
  let page: Mea2nPage;

  beforeEach(() => {
    page = new Mea2nPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    page.getParagraphText().then((text) => {
      expect(text).toEqual('app works!');
    })
  });
});

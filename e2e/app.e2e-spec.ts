import { Ng2BoilerplatePage } from './app.po';

describe('ng2-boilerplate App', () => {
  let page: Ng2BoilerplatePage;

  beforeEach(() => {
    page = new Ng2BoilerplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

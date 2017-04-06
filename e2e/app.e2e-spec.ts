import { ClickToClosePage } from './app.po';

describe('click-to-close App', () => {
  let page: ClickToClosePage;

  beforeEach(() => {
    page = new ClickToClosePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

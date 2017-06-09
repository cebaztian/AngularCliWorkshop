import { WPage } from './app.po';

describe('w App', () => {
  let page: WPage;

  beforeEach(() => {
    page = new WPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

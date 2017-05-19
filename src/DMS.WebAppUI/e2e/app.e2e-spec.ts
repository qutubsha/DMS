import { DMS.WebUIPage } from './app.po';

describe('dms.web-ui App', () => {
  let page: DMS.WebUIPage;

  beforeEach(() => {
    page = new DMS.WebUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

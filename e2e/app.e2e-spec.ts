import { CalPage } from './app.po';

describe('cal App', () => {
  let page: CalPage;

  beforeEach(() => {
    page = new CalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

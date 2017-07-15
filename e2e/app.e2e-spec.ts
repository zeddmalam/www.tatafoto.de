import { Tatafoto.DePage } from './app.po';

describe('tatafoto.de App', () => {
  let page: Tatafoto.DePage;

  beforeEach(() => {
    page = new Tatafoto.DePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

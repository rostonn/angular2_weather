import { ObservableWeatherPage } from './app.po';

describe('observable-weather App', function() {
  let page: ObservableWeatherPage;

  beforeEach(() => {
    page = new ObservableWeatherPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

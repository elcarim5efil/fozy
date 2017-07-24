import $proxy from './proxy';

export default class {
  constructor() {
    this.config = fozy.config.mock.proxy;
    this.headers = {
      'accept-encoding': 'gzip;q=0,deflate,sdch,br',
    };
  }

  getMocker() {
    const config = this.config;

    const option = {
      target: config.target,
      headers: this.headers,
    };

    if (config.host) {
      option.host = config.host;
    }
    return $proxy(option);
  }
}

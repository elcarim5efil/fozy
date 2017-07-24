// import path from 'path';
// import _ from '../util/extend';
import { Proxy, Local } from '../modules/async_mock';

// const root = fozy.root;
const config = fozy.config;
const proxyConf = config.mock.proxy;

export default class Api {
  constructor() {
    if (proxyConf) {
      console.info(`[KS] using proxy api: ${proxyConf.target}`);
      this.mock = new Proxy().getMocker();
    } else {
      console.info('[KS] using local api');
      this.mock = new Local().getMocker();
    }
  }

  getRouter() {
    return this.mock;
  }
}


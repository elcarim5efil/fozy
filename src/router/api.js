// import path from 'path';
// import _ from '../util/extend';
import { Proxy, Local } from '../modules/async_mock';
import { log } from '../util';

// const root = fozy.root;
const config = fozy.config;
const proxyConf = config.mock.proxy;

export default class Api {
  constructor() {
    if (proxyConf) {
      log.info(`using proxy api: ${proxyConf.target}`);
      this.mock = new Proxy().getMocker();
    } else {
      log.info('using local api');
      this.mock = new Local().getMocker();
    }
  }

  getRouter() {
    return this.mock;
  }
}


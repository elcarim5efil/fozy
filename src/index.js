import path from 'path';
import { log, extend } from './util';
import App from './app';

const MAX_RETRY = 10;

export default class Fozy {
  constructor(option) {
    this.listener = null;
    this.MAX_RETRY = option.maxRetry || MAX_RETRY;
    this.tryCount = this.MAX_RETRY;
    this.initConfig(option);
    this.port = this.config.port || 3000;
    this.run();
  }
  initConfig(option) {
    const cwd = path.join(process.cwd());
    const config = {};
    this.configPath = path.join(cwd, 'fozy.config.js');
    if (!extend.isFileExist(this.configPath)) {
      log.error('Cannot find fozy.config.js, please make sure the file exists.');
      return;
    }
    let fozyConfig = null;
    try {
      fozyConfig = require(this.configPath);   //eslint-disable-line
    } catch (err) {
      log.error('Fail reading fozy.config.js, please check your file.', err);
      return;
    }

    // log.info(`using proxy config: ${proxyName}`);
    let proxy = null;
    if (option.proxyName) {
      proxy = fozyConfig.mock.proxyMap[option.proxyName];
    }
    if (proxy) {
      log.info('proxy: ', option.proxyName);
      fozyConfig.mock.proxy = proxy;
    }
    Object.entries(fozyConfig).forEach((entry) => {
      const [key, value] = entry;
      config[key] = value;
    });

    Object.assign(config, {
      root: cwd,
      dev: {
        watch: option.watch || false,
      },
    });

    this.config = config;
  }
  run() {
    if (!this.listener) {
      this.doListen();
    }
    this.onError();
  }
  doListen() {
    if (!this.config) {
      return;
    }
    this.listener = new App(this.config).listen(this.port, () => {
      log.info('Server is listening to port %d', this.listener.address().port);
    });
  }
  onError() {
    process.on('uncaughtException', (err) => {
      if (err.code === 'EADDRINUSE') {
        this.tryCount -= 1;
        if (this.tryCount > 0) {
          this.port += 1;
          log.warn('Port %d is in used, trying port %d', this.port - 1, this.port);
          this.doListen();
        } else {
          log.warn('Retry to much time(%d)', this.tryCount);
        }
      } else {
        log.error('Undandle error', err);
      }
    });
  }
}

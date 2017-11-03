import Koa from 'koa';
import convert from 'koa-convert';
import KoaBodyparser from 'koa-bodyparser';
import path from 'path';
import Router from './router';
import { log } from './util';
import { logger, localApi, proxyApi, pages } from './middlewares';
import IndexPage from './router/index_page';
import liveReload from './live_reload';

export default class App {
  constructor(config) {
    this.config = config || {};
    this.root = config.root;
    this.proxyConf = (config.mock && config.mock.proxy) || null;
    this.initApp();
  }
  initApp() {
    const app = new Koa();
    const { root, config } = this;
    this.app = app;
    // setup live reload
    if (this.config.dev.watch) {
      app.use(liveReload(config));
    }

    // static files
    this.config.resource.forEach((item) => {
      const staticFilePath = path.join(root, item);
      const staticRoute = convert(require('koa-static')(staticFilePath));
      app.use(staticRoute);
    });

    // logger
    app.use(logger(config));

    app.use(new IndexPage(config).getRouter());

    if (this.proxyConf) {
      log.info(`Using proxy api: ${this.proxyConf.target}`);
      app.use(proxyApi(config));
    } else {
      log.info('Using local api');
      app.use(convert(KoaBodyparser()));
      app.use(localApi(config));
    }
    const router = Router(config);

    app.use(router.routes(), router.allowedMethods());

    app.use(pages(config));

    app.on('error', (err, ctx) => {
      log.error('Server error', err, ctx);
    });
  }
  listen(...args) {
    return this.app.listen(...args);
  }
}

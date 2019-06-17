import Koa from 'koa';
import cors from 'koa2-cors';
import convert from 'koa-convert';
import KoaBodyparser from 'koa-bodyparser';
import path from 'path';
import router from './router';
import { log } from './util';
import { logger, localApi, proxyApi, pages } from './middlewares';
import IndexPage from './router/index_page';

const bodyparser = KoaBodyparser();
const app = new Koa();
const root = fozy.root;
const config = fozy.config;
const proxyConf = config.mock.proxy;

// setup live reload
if (global.fozy.dev.watch) {
  app.use(require('./live_reload'));
}

// static files
config.resource.forEach((item) => {
  const staticFilePath = path.join(root, item);
  const staticRoute = convert(require('koa-static')(staticFilePath));
  app.use(staticRoute);
});

// logger
app.use(logger());

app.use(new IndexPage().getRouter());

// 支持跨域
app.use(cors({ origin: () => '*', }));

if (proxyConf) {
  log.info(`Using proxy api: ${proxyConf.target}`);
  app.use(proxyApi());
} else {
  log.info('Using local api');
  app.use(convert(bodyparser));
  app.use(localApi());
}

app.use(router.routes(), router.allowedMethods());

app.use(pages());

app.on('error', (err, ctx) => {
  log.error('Server error', err, ctx);
});

module.exports = app;

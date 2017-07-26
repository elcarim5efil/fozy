import Koa from 'koa';
// import co from 'co';
import convert from 'koa-convert';
import json from 'koa-json';
// import onerror from 'koa-onerror';
import KoaBodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import path from 'path';

import router from './router';
import { log } from './util';

const bodyparser = KoaBodyparser();
const app = new Koa();
const root = fozy.root;
const config = fozy.config;

if (!config.mock.proxy) {
  app.use(convert(bodyparser));
}
app.use(convert(json()));
if (config.logMode) {
  app.use(convert(logger()));
}

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
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  log.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(router.routes(), router.allowedMethods());

app.on('error', (err, ctx) => {
  log.error('Server error', err, ctx);
});

module.exports = app;

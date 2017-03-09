
'use strict';

import Koa from 'koa';
import co from 'co';
import convert from 'koa-convert';
import json from 'koa-json';
import onerror from 'koa-onerror';
import KoaBodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import path from 'path';

import router from './router';

const bodyparser = KoaBodyparser();
const app = new Koa();
const __root = fozy.__root;
const config = fozy.__config;

if(!config.mock.proxy) {
    app.use(convert(bodyparser));
}
app.use(convert(json()));
if(config.logMode) {
    app.use(convert(logger()));
}

// setup live reload
if (global.fozy.__dev.watch) {
    app.use(require('./live_reload'));
}

// static files
config.resource.forEach(function(item){
    var staticFilePath = path.join(__root, item);
    var staticRoute = convert(require('koa-static')(staticFilePath));
    app.use(staticRoute);
})

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`[KS] ${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(router.routes(), router.allowedMethods());

app.on('error', function(err, ctx){
  console.log(err)
  logger.error('[KS] Server error', err, ctx);
});

module.exports = app;
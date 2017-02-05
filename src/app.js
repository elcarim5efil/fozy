
'use strict';

import Koa from 'koa';
const app = new Koa();
const router = require('koa-router')();
import co from 'co';
import convert from 'koa-convert';
import json from 'koa-json';
import onerror from 'koa-onerror';
const bodyparser = require('koa-bodyparser')();
import logger from 'koa-logger';
import path from 'path';

import mockServer from './mock';
import indexPage from './router/index_page';
const __root = fozy.__root;
const config = require(path.join(__root, 'fozy.config'));

// middlewares
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
    app.use(convert(require('koa-static')(path.join(__root, item))));
})

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`[KS] ${ctx.method} ${ctx.url} - ${ms}ms`);
});

// pages index
router.get('/fozy/index', indexPage);

// route to mock server
router.use('/', mockServer.routes(), mockServer.allowedMethods());

// router.get('*', indexPage);

app.use(router.routes(), router.allowedMethods());


app.on('error', function(err, ctx){
  console.log(err)
  logger.error('[KS] Server error', err, ctx);
});

module.exports = app;

'use strict';

const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const path = require('path');

const mockServer = require('./mock');
const indexPage = require('./index_page');
const __root = fozy.__root;
const config = require(path.join(__root, 'fozy.config'));
const $proxy = require('koa-http-proxy');

// middlewares
if(!config.mock.proxy) {
    console.log('no proxy');
    app.use(convert(bodyparser));
}
app.use(convert(json()));
if(config.logMode) {
    app.use(convert(logger()));
}

// static files
config.resource.forEach(function(item){
    app.use(convert(require('koa-static')(path.join(__root, item))));
})

// logger
app.use(async (ctx, next) => {
  // console.log('incoming', ctx);
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`[KS] ${ctx.method} ${ctx.url} - ${ms}ms`);
});

// route to mock server
router.use('/', mockServer.routes(), mockServer.allowedMethods());

// pages index
router.get('/', indexPage);

app.use(router.routes(), router.allowedMethods());

app.on('error', function(err, ctx){
  console.log(err)
  logger.error('[KS] Server error', err, ctx);
});

module.exports = app;

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

const mockServer = require('./lib/mock_server');
const __root = fozy.__root;
const config = require(path.join(__root, 'config'));

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));

config.resource.forEach(function(item){
    app.use(require('koa-static')(path.join(__root, item)));
})

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.use('/', mockServer.routes(), mockServer.allowedMethods());

app.use(router.routes(), router.allowedMethods());

app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx);
});


module.exports = app;
const Koa = require('koa');
const convert = require('koa-convert');
const KoaBodyparser = require('koa-bodyparser');
const path = require('path');
const router = require('./router');
const { log } = require('./util');
const { logger, localApi, proxyApi, pages } = require('./middlewares');
const IndexPage = require('./router/index_page');

const bodyparser = KoaBodyparser();
const app = new Koa();
const root = fozy.root;
const config = fozy.config;
const proxyConf = config.mock.proxy;

if (fozy.config.middlewares) {
  fozy.config.middlewares.forEach((middleware) => {
    app.use(middleware(fozy));
  });
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
app.use(logger());

app.use(new IndexPage().getRouter());

if (proxyConf) {
  log.info(`Using proxy api: ${proxyConf.target}`);
  app.use(proxyApi());
} else {
  log.info('Using local api');
  app.use(convert(bodyparser));
  app.use(localApi());
}

app.use(router.routes(), router.allowedMethods());

app.use(pages(config.template));

app.on('error', (err, ctx) => {
  log.error('Server error', err, ctx);
});

module.exports = app;

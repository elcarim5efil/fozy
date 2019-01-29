const https = require('https');
const proxy = require('../modules/proxy');
const { isPage, isFozy } = require('../util');

module.exports = function () {
  const config = fozy.config.mock.proxy;
  const headers = {
    'accept-encoding': 'gzip;q=0,deflate,sdch,br',
  };
  const option = {
    target: config.target,
    // agent: https.globalAgent,
    headers,
  };

  if (/^https/.test(config.target)) {
    option.agent = https.globalAgent;
  }

  if (config.host) {
    option.headers.host = config.host;
  }

  const doProxy = proxy(option);

  return async (ctx, next) => {
    if (isPage(ctx) || isFozy(ctx.url)) {
      return next();
    }
    return doProxy(ctx, next);
  };
}

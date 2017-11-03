import https from 'https';
import proxy from '../modules/proxy';
import { isPage, isFozy } from '../util';

export default function (config) {
  const proxyConfig = config.mock.proxy;
  const headers = {
    'accept-encoding': 'gzip;q=0,deflate,sdch,br',
  };
  const option = {
    target: proxyConfig.target,
    headers,
  };

  if (/^https/.test(proxyConfig.target)) {
    option.agent = https.globalAgent;
  }

  if (proxyConfig.host) {
    option.headers.host = proxyConfig.host;
  }

  const doProxy = proxy(config, option);

  return async (ctx, next) => {
    if (isPage(config, ctx) || isFozy(ctx.url)) {
      return next();
    }
    return doProxy(ctx, next);
  };
}

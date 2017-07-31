import proxy from '../modules/proxy';
import { isPage } from '../util';

export default function () {
  const config = fozy.config.mock.proxy;
  const headers = {
    'accept-encoding': 'gzip;q=0,deflate,sdch,br',
  };
  const option = {
    target: config.target,
    headers,
  };

  if (config.host) {
    option.host = config.host;
  }

  const doProxy = proxy(option);

  return async (ctx, next) => {
    if (isPage(ctx.url)) {
      return next();
    }
    return doProxy(ctx, next);
  };
}

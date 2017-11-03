import { AsyncData } from '../modules/data';
import { isPage, isFozy } from '../util';

const isEmptyData = function isEmptyData(obj) {
  return Object.keys(obj).length === 0;
};

export default function localApi(config) {
  const { defaultData } = config.mock.api;
  return async (ctx, next) => {
    if (isPage(config, ctx) || isFozy(ctx.url)) {
      return next();
    }
    try {
      let data = await new AsyncData(config).get(ctx);
      if (isEmptyData(data)) {
        if (!defaultData) {
          return next();
        }
        data = defaultData;
      }

      ctx.body = data;
      ctx.type = 'json';
    } catch (err) {
      return next();
    }
    return null;
  };
}

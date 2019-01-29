const { AsyncData } = require('../modules/data');
const { isPage, isFozy } = require('../util');

const config = fozy.config;
const isEmptyData = function isEmptyData(obj) {
  return Object.keys(obj).length === 0;
};

module.exports = function () {
  const defaultData = config.mock.api.defaultData;
  return async (ctx, next) => {
    if (isPage(ctx) || isFozy(ctx.url)) {
      return next();
    }
    try {
      let data = await AsyncData.get(ctx);
      if (isEmptyData(data) && !defaultData) {
        return next();
      }
      if (defaultData) {
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

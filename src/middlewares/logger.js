const { log } = require('../util');

module.exports = function () {
  return async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    log.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
  };
}

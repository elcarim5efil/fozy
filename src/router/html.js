const path = require('path');
const fs = require('../promise/fs');

const root = fozy.root;
const config = fozy.config;

module.exports = class {
  getRouter() {
    return async (ctx, next) => {
      const p = path.join(root, config.htmlView || 'views', `${ctx.url}.html`);
      try {
        const data = await fs.readFileAsync(p);
        ctx.type = 'html';
        ctx.body = data;
      } catch (err) {
        return next();
      }
      return null;
    };
  }
}

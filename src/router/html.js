import path from 'path';
import fs from '../promise/fs';

export default function (config) {
  const { root } = config;
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

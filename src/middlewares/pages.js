import path from 'path';
import { isPage, extend, log } from '../util';
import { SyncData } from '../modules/data';

export default function (config, option = {}) {
  const { root } = config;
  const templateRoot = path.join(root, config.template.root || '');
  let engine;
  option.engine = option.engine || 'ftl';

  if (option.engine === 'ftl') {
    engine = require('../engine/freemarker')({
      viewRoot: templateRoot,
      options: {
        // sourceEncoding: 'UTF-8',
      },
    });
  }

  function isTplFileExist(tplPath) {
    return tplPath !== -1 && extend.isFileExist(path.join(templateRoot, tplPath));
  }

  function getPathByUrl(url) {
    let res = -1;
    extend.which(config.pages, (page) => {
      const pageUrl = page.url.split('?')[0];
      const pureUrl = url.split('?')[0];
      if (pageUrl === pureUrl) {
        res = page.path;
        return true;
      }
      return false;
    });
    return res;
  }

  async function getSyncData(ctx, tplPath) {
    const data = await new SyncData(config).get({
      ctx,
      path: extend.removePostfix(tplPath),
    });
    return data;
  }

  async function respondHtml(ctx, json, tplPath) {
    let result = {
      output: '',
      html: '',
    };

    try {
      result = await engine.render(tplPath, json || {});
    } catch (err) {
      const errorText = '[KS] render error, please check your template files and json files';
      result.html = errorText;
      log.error(errorText);
    }

    if (/(^>>>\sABORTED!\s<<<).*/.test(result.output)) {
      ctx.body = result.output;
    } else {
      ctx.body = result.html;
    }
  }
  return async (ctx, next) => {
    if (!isPage(config, ctx)) {
      return next();
    }
    const tplPath = getPathByUrl(extend.removeQueryString(ctx.url));
    console.log(templateRoot, tplPath, isTplFileExist(tplPath));
    if (!isTplFileExist(tplPath)) {
      return next();
    }

    const json = await getSyncData(ctx, tplPath);
    await respondHtml(ctx, json, tplPath);
    return null;
  };
}

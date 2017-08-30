import path from 'path';
import { isPage, extend, log } from '../util';
import { SyncData } from '../modules/data';

const root = fozy.root;
const config = fozy.config;
const templateRoot = path.join(root, config.template.root || '');

const getPathByUrl = function getPathByUrl(url) {
  let res = -1;
  extend.which(config.pages, (item) => {
    if (item.url === url) {
      res = item.path;
      return true;
    }
    return false;
  });
  return res;
};

export default function (option = {}) {
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

  async function getSyncData(ctx, tplPath) {
    const data = await SyncData.get({
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
    if (!isPage(ctx.url)) {
      return next();
    }
    const tplPath = getPathByUrl(extend.removeQueryString(ctx.url));

    if (!isTplFileExist(tplPath)) {
      return next();
    }

    const json = await getSyncData(ctx, tplPath);
    await respondHtml(ctx, json, tplPath);
    return null;
  };
}
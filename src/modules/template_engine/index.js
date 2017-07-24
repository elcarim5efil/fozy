

import path from 'path';
import _ from '../../util/extend';
import { SyncData } from '../data';

const root = fozy.root;
const config = fozy.config;
const templateRoot = path.join(root, config.template.root || '');


export default class Engine {
  constructor(option) {
    this.pages = config.pages;
    if (option.engine === 'ftl') {
      this.createEngine(option);
      this.fileType = '.ftl';
    }
  }

  createEngine() {
    this.engine = require('../../engine/freemarker')({
      viewRoot: templateRoot,
      options: {
        // sourceEncoding: 'UTF-8',
      },
    });

    return this.engine;
  }

  getRouter() {
    return async (ctx, next) => {
      const tplPath = this.getPathByUrl(_.removeQueryString(ctx.url));

      if (!this.isTplFileExist(tplPath)) {
        return next();
      }

      const json = await this.getSyncData(ctx, tplPath);
      await this.respondHtml(ctx, json, tplPath);
    };
  }

  getPathByUrl(url) {
    let res = -1;
    _.which(config.pages, (item) => {
      if (item.url === url) {
        res = item.path;
        return true;
      }
    });
    return res;
  }

  isTplFileExist(tplPath) {
    return tplPath !== -1 && _.isFileExist(path.join(templateRoot, tplPath));
  }

  async getSyncData(ctx, tplPath) {
    return await new SyncData({
      ctx,
      fileType: this.fileType,
      path: _.removePostfix(tplPath),
    }).getData();
  }

  async respondHtml(ctx, json, tplPath) {
    let result = {
      output: '',
      html: '',
    };

    try {
      result = await this.engine.render(tplPath, json || {});
    } catch (err) {
      result.html = '[KS] render error, please check your template files and json files';
      console.error('[KS] render error, please check your template files and json files');
    }

    if (/(^>>>\sABORTED!\s<<<).*/.test(result.output)) {
      ctx.body = result.output;
    } else {
      ctx.body = result.html;
    }
  }
}

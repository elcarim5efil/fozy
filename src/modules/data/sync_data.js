import _path from 'path';
import qs from 'querystring';
import { log, JSONProcessor } from '../../util';
import LocalData from './local_data';

function processData(path, data, ctx) {
  const proc = new JSONProcessor({
    module: `${path}.js`,
    preStringify: true,
  });

  return proc.process(
    Object.assign({}, data || {}),
    ctx.request.body,
    qs.parse(ctx.url.split('?')[1]),
    ctx,
  );
}

export default class SyncData {
  constructor(config) {
    this.root = config.root;
    this.config = config;
    this.globalJsonPath = _path.join(this.root, config.template.mock, '__global/data');
  }
  async get(option) {
    const { root, config, globalJsonPath } = this;
    const ctx = option.ctx || {};
    const path = option.path || '';
    const pageDataPath = _path.join(root, config.template.mock || '', (path || ctx.url));

    let data = {};
    let globalData = {};
    let pageData = {};

    try {
      globalData = await new LocalData(config).get(globalJsonPath);
      if (globalData === false) {
        throw new Error();
      }
    } catch (err) {
      log.error(`Sync global mock data parse error, check your template .json file, url: ${globalJsonPath}.json`);
    }
    globalData = globalData || {};

    try {
      globalData = processData(globalJsonPath, globalData, ctx);
    } catch (err) {
      log.error(`Sync global mock data parse error, check your template .js file, url: ${globalJsonPath}.js`);
    }

    try {
      pageData = await new LocalData(config).get(pageDataPath);
      if (pageData === false) {
        throw new Error();
      }
    } catch (err) {
      log.error(`Sync mock data parse error, check your template .json file, url: ${path}.json`);
    }
    pageData = pageData || {};

    if (pageData) {
      try {
        let temp;
        if (!pageData.__disableGlobalData) {    // eslint-disable-line
          temp = Object.assign({}, globalData || {}, pageData);
        } else {
          temp = Object.assign({}, pageData);
        }
        data = temp || data;
      } catch (err) {
        /* ignore */
      }
    }

    try {
      data = processData(path, data, ctx);
    } catch (err) {
      log.error(`Sync mock data parse error, check your template .js file, url: ${path}.js`);
    }

    return data || {};
  }
}

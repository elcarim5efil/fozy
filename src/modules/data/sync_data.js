import _path from 'path';
import qs from 'querystring';
import { log, JSONProcessor } from '../../util';
import LocalData from './local_data';

const root = fozy.root;
const config = fozy.config;
const globalJsonPath = _path.join(root, config.template.mock, '__global/data');


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

export default {
  async get(option) {
    const ctx = option.ctx || {};
    const path = option.path || '';
    const pageDataPath = _path.join(root, config.template.mock || '', (path || ctx.url));

    let data;
    let globalData;
    try {
      globalData = await LocalData.get(globalJsonPath);
    } catch (err) {
      log.error(`Sync global mock data parse error, check your template .json file, url: ${globalJsonPath}.json`);
    }

    try {
      globalData = processData(globalJsonPath, globalData, ctx);
    } catch (err) {
      log.error(`Sync global mock data parse error, check your template .js file, url: ${globalJsonPath}.js`);
    }

    try {
      const pageData = await LocalData.get(pageDataPath);
      if (!pageData.__disableGlobalData) {    // eslint-disable-line
        data = Object.assign({}, globalData, pageData);
      } else {
        data = Object.assign({}, pageData);
      }
    } catch (err) {
      log.error(`Sync mock data parse error, check your template .json file, url: ${path}.json`);
    }

    try {
      data = processData(path, data, ctx);
    } catch (err) {
      log.error(`Sync mock data parse error, check your template .js file, url: ${path}.js`);
    }

    return data;
  },
};

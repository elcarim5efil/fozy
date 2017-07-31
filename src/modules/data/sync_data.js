import _path from 'path';
import qs from 'querystring';
import { log } from '../../util';

import JSONProcessor from '../../util/json.processor';
import LocalData from './local_data';

const root = fozy.root;
const config = fozy.config;
const globalJsonPath = _path.join(root, config.template.mock, '__global/data');


const processData = (path, data, ctx) => {
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
};

export default {
  async get(option) {
    const ctx = option.ctx || {};
    const path = option.path || '';
    const pageDataPath = _path.join(root, config.template.mock || '', (path || ctx.url));

    let data;
    try {
      const globalData = await LocalData.get(globalJsonPath);
      const pageData = await LocalData.get(pageDataPath);
      data = Object.assign({}, globalData, pageData);
      data = processData(path, data, ctx);
    } catch (err) {
      log.error(`Sync Mock data parse error, check your template .json files, url: ${ctx.url}`);
    }

    return data;
  },
};

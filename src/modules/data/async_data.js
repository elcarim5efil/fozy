import path from 'path';
import qs from 'querystring';
import _ from '../../util/extend';
import LocalData from './local_data';
import { log, JSONProcessor } from '../../util';

const rootPath = fozy.root;
const config = fozy.config;

const getFilePath = function getFilePath(ctx) {
  const url = _.removePostfix(ctx.url.split('?')[0]);
  const method = ctx.method.toLocaleLowerCase();
  const root = path.join(rootPath, config.mock.api.root, method && config.mock.api[method]);
  const fileName = config.mock.fileName || '';
  return path.join(root, url, fileName);
};

const processData = (filePath, data, ctx) => {
  const proc = new JSONProcessor({
    module: `${filePath}.js`,
    preStringify: false,
  });

  return proc.process(
    Object.assign({}, data || {}),
    ctx.request.body,
    qs.parse(ctx.url.split('?')[1]),
    ctx,
  );
};

export default {
  async get(ctx) {
    const filePath = getFilePath(ctx) || '';
    let data;
    try {
      data = await LocalData.get(filePath);
      data = processData(filePath, data, ctx);
    } catch (e) {
      log.error(`Async Mock data parse error, check your template .json files, url: ${ctx.url}`);
    }
    return data;
  },
};

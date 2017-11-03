import path from 'path';
import qs from 'querystring';
import _ from '../../util/extend';
import LocalData from './local_data';
import { log, JSONProcessor } from '../../util';

function processData(filePath, data, ctx) {
  const proc = new JSONProcessor({
    module: `${filePath}.js`,
    preStringify: false,
  });

  const d = proc.process(
    Object.assign({}, data || {}),
    ctx.request.body,
    qs.parse(ctx.url.split('?')[1]),
    ctx,
  );
  return d;
}

export default class AsyncData {
  constructor(config) {
    this.rootPath = config.root;
    this.config = config;
  }
  async get(ctx) {
    const filePath = this.getFilePath(ctx) || '';
    let data;
    try {
      data = await new LocalData(this.config).get(filePath);
      data = processData(filePath, data, ctx);
    } catch (e) {
      log.error(`Async Mock data parse error, check your template .json files, url: ${ctx.url}`);
    }
    return data;
  }
  getFilePath(ctx) {
    const { rootPath, config } = this;
    const url = _.removePostfix(ctx.url.split('?')[0]);
    const method = ctx.method.toLocaleLowerCase();
    const root = path.join(rootPath, config.mock.api.root, method && config.mock.api[method]);
    const fileName = config.mock.fileName || '';
    return path.join(root, url, fileName);
  }
}

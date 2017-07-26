import path from 'path';
import qs from 'querystring';
import _ from '../../util/extend';
import JSONProcessor from '../../util/json.processor';
import LocalData from './local_data';

const rootPath = fozy.root;
const config = fozy.config;

const getFilePath = function getFilePath(ctx) {
  const url = _.removePostfix(ctx.url.split('?')[0]);
  const method = ctx.method.toLocaleLowerCase();
  const root = path.join(rootPath, config.mock.api.root, method && config.mock.api[method]);
  const fileName = config.mock.fileName || '';
  return path.join(root, url, fileName);
};

export default class AsyncData {
  constructor(ctx) {
    this.ctx = ctx;
    this.filePath = getFilePath(ctx) || '';
    this.data = {};
  }

  async getData() {
    this.data = await new LocalData({
      path: this.filePath,
    }).getData();

    return this.processData(this.data, this.ctx);
  }

  processData(data, ctx) {
    const proc = new JSONProcessor({
      module: `${this.filePath}.js`,
      preStringify: false,
    });

    return proc.process(
      data || {},
      ctx.request.body,
      qs.parse(ctx.url.split('?')[1]),
      ctx,
    );
  }
}


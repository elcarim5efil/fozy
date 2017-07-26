import _path from 'path';
import qs from 'querystring';
import { log } from '../../util';

import JSONProcessor from '../../util/json.processor';
import LocalData from './local_data';
import GlobalSyncData from './global_sync_data';

const root = fozy.root;
const config = fozy.config;


export default class MockData {
  constructor(option) {
    this.ctx = option.ctx || {};
    this.fileType = option.fileType || '.json';
    this.path = option.path || '';
    this.pageDataPath = _path.join(root, config.template.mock || '', (this.path || this.ctx.url));
  }

  getData() {
    return this.data || this.updateData();
  }

  async updateData() {
    let data;
    try {
      const globalData = await new GlobalSyncData().getData();
      const pageData = await new LocalData({
        path: this.pageDataPath,
      }).getData();
      data = Object.assign({}, globalData, pageData);
    } catch (err) {
      log.error(`Mock data parse error, check your template .json files, url: ${this.ctx.url}`);
    }

    return this.processData(data);
  }

  processData(data) {
    const ctx = this.ctx;
    const proc = new JSONProcessor({
      module: `${this.path}.js`,
      preStringify: true,
    });

    return proc.process(
      data,
      ctx.request.body,
      qs.parse(ctx.url.split('?')[1]),
      ctx,
    );
  }
}

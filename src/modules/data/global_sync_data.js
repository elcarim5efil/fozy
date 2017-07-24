

import path from 'path';
import LocalData from './local_data';

const root = fozy.root;
const config = fozy.config;
const globalJsonPath = path.join(root, config.template.mock, '__global/data');

export default class GlobalSyncData {
  async getData() {
    const localData = await new LocalData({
      path: globalJsonPath,
    });
    return localData.getData();
  }
}

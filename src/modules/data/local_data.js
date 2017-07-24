import json5 from 'json5';
import _ from '../../util/extend';
import fs from '../../promise/fs';

export default class LocalData {
  constructor(option) {
    this.path = option.path;
    this.postfix = option.postfix || '.json';
    this.body = option.body || {};
    this.queryStr = option.queryStr || {};
  }

  async getData() {
    let json = {};
    const jsonPath = this.path + this.postfix;
    const json5Path = `${this.path}.json5`;
    const isJsonFileExist = _.isFileExist(jsonPath);
    const isJson5FileExist = _.isFileExist(json5Path);

    let path = null;
    if (isJson5FileExist) {
      path = json5Path;
    } else if (isJsonFileExist) {
      path = jsonPath;
    }

    if (path) {
      try {
        const file = await fs.readFileAsync(path, 'utf-8');
        json = json5.parse(file);
      } catch (err) {
        console.info(`[KS] data parse error, check file: ${jsonPath}`);
      }
    }
    return json;
  }
}
